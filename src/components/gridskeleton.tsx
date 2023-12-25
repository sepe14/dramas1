import style from "./skeleton.module.css";

export default function GridSkeleton() {
  return (
    <div className={style.grid}>
      <div className="loading">
        <span></span>
      </div>
      <div className="loading">
        <span></span>
      </div>
      <div className="loading">
        <span></span>
      </div>
      <div className="loading">
        <span></span>
      </div>
      <div className="loading">
        <span></span>
      </div>
      <div className="loading">
        <span></span>
      </div>
      <div className="loading">
        <span></span>
      </div>
      <div className="loading">
        <span></span>
      </div>
      <div className="loading">
        <span></span>
      </div>
    </div>
  );
}
