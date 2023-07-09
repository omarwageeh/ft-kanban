export default function TaskCard({
  card,
  openModal,
}: {
  card: any;
  openModal: Function;
}) {
  return (
    <div className="task-card" onClick={() => openModal("TaskModal", card)}>
      <p className="task-card-header">{card?.name}</p>
      <p className="task-card-subtask-info">0 of 3 subtasks</p>
    </div>
  );
}
