interface AddCaseCardProps {
  onClick: () => void;
}

const AddCaseCard = ({ onClick }: AddCaseCardProps) => {
  return (
    <div
      className="card bg-dark border-secondary text-light card-hover h-100 d-flex align-items-center justify-content-center"
      onClick={onClick}
      style={{ cursor: 'pointer', minHeight: '400px' }}
    >
      <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
        <div className="mb-3">
          <i className="bi bi-plus-circle display-1 text-danger"></i>
        </div>
        <h5 className="card-title text-light mb-2">Add New Case</h5>
        <p className="card-text text-muted">
          Create a new vacation rental case
        </p>
      </div>
    </div>
  );
};

export default AddCaseCard;