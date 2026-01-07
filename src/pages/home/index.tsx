import BookTypePie from "./Charts/BookTypePie";
import IssueCommentCount from "./Charts/IssueCommentCount";
import QuizTypePie from "./Charts/QuizTypePie";
import UserCountLine from "./Charts/UserCountLine";
import styles from "./index.module.less";

const HomePage = () => {
    return (
        <div className={styles.container}>
            {/* 第一行：左侧为用户数量折线图 */}
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <UserCountLine></UserCountLine>
                </div>
                <div className={styles.middle}>
                    <QuizTypePie></QuizTypePie>
                </div>
                <div className={styles.right}>
                    <BookTypePie />
                </div>
            </div>
            <div className={styles.wrapper}>
                <IssueCommentCount></IssueCommentCount>
            </div>
        </div>
    );
};

export default HomePage;
