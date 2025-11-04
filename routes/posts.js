import express from 'express'
import sql from '../db/sql.js'

const router = express.Router()

/* 목록, 페이지네이션 */
router.get('/', async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        const offset = (page - 1) * pageSize;

        const [countRows] = await sql.getPosts(); // 총 게시글
        const total = countRows.length;

        const posts = await sql.getPosts();
        res.json({ page, pageSize, total, posts });
    } catch (err) {
        next(err);
    }
});

/* 게시글 상세, 댓글 목록 */
router.get('/:id', async (req, res, next) => {
    try {
        const postId = Number(req.params.id)
        const rows = await sql.getPostsById(postId)

        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: '게시글이 존재하지 않습니다.' })
        }

        const base = rows[0]
        const post = {
            post_id: base.post_id,
            author: base.post_author ?? null,
            title: base.title,
            content: base.content,
            view_count: base.view_count,
            status: base.status,
            create_fmt: base.create_fmt
        }
        const comments = rows
            .filter((r) => r.comment_id != null)
            .map((r) => ({
                comment_id: r.comment_id,
                content: r.comment_content,
                comment_fmt: r.comment_fmt,
                author: r.comment_author ?? null
            }))

        res.json({ post, comments })
    } catch (error) {
        next(error)
    }
})

/* 조회수 +1 */
router.post('/:id/view', async (req, res, next) => {
    try {
        const postId = Number(req.params.id)
        await sql.updatePostsViewCount(postId)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

/* status 상태 변경(public/private/deleted)*/
router.patch('/:id/status', async (req, res, next) => {
    try {
        const postId = Number(req.params.id)
        const { status } = req.body
        const allowed = ['public', 'private', 'deleted']

        if (!allowed.includes(status)) {
            return res.status(400).json({ message: '잘못된 상태 값입니다.' })
        }
        await sql.updatePostsStatus(postId, status)
        res.json({ message: '상태가 변경되었습니다.', status })
    } catch (error) {
        next(error)
    }
})

/* 게시글 soft delete */
router.delete('/:id', async (req, res, next) => {
    try {
        const postId = Number(req.params.id)
        await sql.updatePostsDelete(postId)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

/* 댓글 soft delete */
// router.delete('/:id', async (req, res, next) => {
//     try {
//         const commentId = Number(req.params.id)
//         await sql.updateCommentsDelete(commentId)
//         res.status(204).end()
//     } catch (error) {
//         next(error)
//     }
// })

/* 댓글 soft delete (postId + commentId) */
router.delete('/:postId/comments/:commentId', async (req, res, next) => {
    try {
        const postId = Number(req.params.postId)
        const commentId = Number(req.params.commentId)

        // (선택) 간단 검증
        if (!Number.isInteger(postId) || postId <= 0 ||
            !Number.isInteger(commentId) || commentId <= 0) {
            return res.status(400).json({ message: 'invalid id' })
        }

        const result = await sql.updateCommentsDelete(commentId, postId)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'not found' })
        }

        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

export default router