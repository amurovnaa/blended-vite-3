import css from './GoBackBtn.module.css';
const GoBackBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className={css.link}>
      GoBackBtn
    </button>
  );
};

export default GoBackBtn;
