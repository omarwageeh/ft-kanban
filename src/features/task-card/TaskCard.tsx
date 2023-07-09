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
      {card.idChecklists ? (
        <p className="task-card-subtask-info">
          0 of {card.idChecklists.length}
        </p>
      ) : (
        <p className="task-card-subtask-info">0 of 0</p>
      )}
    </div>
  );
}
