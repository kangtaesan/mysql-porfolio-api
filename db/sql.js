import db from './pool.js'

const sql = {

    getUsers: async () => {
        const [rows] = await db.query(
            `SELECT * FROM users
            ORDER BY create_at DESC`
        )
        return rows
    },

    getPosts: async () => {
        const [rows] = await db.query(
            `SELECT * FROM posts
            ORDER BY create_at DESC`
        )
        return rows
    },

    getComments: async () => {
        const [rows] = await db.query(
            `SELECT * FROM comments
            ORDER BY create_at DESC`
        )
        return rows
    },

    getPostsJoined: async (pageSize, offset) => {
        const [rows] = await db.query(
            `SELECT P.post_id, U.nickname, P.title, P.view_count, P.status,
            DATE_FORMAT(P.create_at, '%Y-%m-%d') AS create_fmt
            FROM posts P
            LEFT JOIN users U
                ON P.fk_user_id = U.user_id
                WHERE p.delete_at IS NULL
                ORDER BY P.create_at DESC
            LIMIT ? OFFSET ?`,
            [pageSize, offset]
        )
        return rows
    }, // LIMIT 가져올_개수 OFFSET 시작_위치

    updatePostsViewCount: async (postId) => {
        const [result] = await db.query(
            `UPDATE posts
            SET view_count = view_count + 1
            WHERE post_id = ?`,
            [postId]
        )
        return result
    },

    updatePostsStatus: async (postId, status) => {
        const [result] = await db.query(
            `UPDATE posts SET status = ? WHERE post_id = ?`,
            [status, postId]
        )
        return result
    },

    // soft delete
    updatePostsDelete: async (postId) => {
        const [result] = await db.query(
            `UPDATE posts
            SET delete_at = NOW()
            WHERE post_id = ?`,
            [postId]
        )
        return result
    },

    getPostsById: async (postId) => {
        const [rows] = await db.query(
            `SELECT P.post_id, P.title, U.nickname AS post_author, P.content, P.view_count, P.status,
            DATE_FORMAT(P.create_at, '%Y-%m-%d %H:%i') AS create_fmt,
            C.comment_id, C.content AS comment_content, DATE_FORMAT(C.create_at, '%Y-%m-%d %H:%i') AS comment_fmt,
            CU.nickname AS comment_author
            FROM comments C
            LEFT JOIN users U ON C.fk_user_id = U.user_id
            LEFT JOIN posts P ON C.fk_post_id = P.post_id
            LEFT JOIN users CU ON C.fk_user_id = CU.user_id
            WHERE P.post_id = ?
            AND P.delete_at IS NULL
            AND C.delete_at IS NULL
            ORDER BY C.create_at ASC;`,
            [postId]
        )
        return rows
    },

    // soft delete
    updateCommentsDelete: async (commentId, postId) => {
        const [result] = await db.query(
            `UPDATE comments
            SET delete_at = NOW()
            WHERE comment_id = ?
            AND fk_post_id = ?
            AND delete_at IS NULL`,
            [commentId, postId]
        )
        return result
    },
}

export default sql