import { QuizType } from "@/pages/interview/components/InterviewModalForm";
import { request } from "@umijs/max";
export default {
    /**
     * 分页查询考试题
     */
    getInterviews(
        params: {
            page: number;
            page_size: number;
            type?: string;
            quizTitle?: string;
        } = { page: 1, page_size: 10 }
    ) {
        return request("/api/quiz/get_all_quiz/", {
            method: "get",
            skipErrorHandler: true,
            params,
        });
    },
    /**
     * 新增考试题
     */
    addInterview(data: {
        quizTitle: string;
        quizContent: string;
        type_id: string;
    }) {
        return request("/api/quiz/", {
            method: "post",
            skipErrorHandler: true,
            data,
        });
    },
    /**
     * 更新考试题
     */
    updateInterview(id: string, data: QuizType) {
        return request(`/api/quiz/${id}`, {
            method: "put",
            skipErrorHandler: true,
            data,
        });
    },
    /**
     * 删除考试题
     */
    deleteInterview(id: string) {
        return request(`/api/quiz/${id}`, {
            method: "delete",
            skipErrorHandler: true,
        });
    },
};
