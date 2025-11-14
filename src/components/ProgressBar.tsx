const ProgressBar = ({ title, progressPercentage }: { title: string; progressPercentage: number }) => {
    return (
        <div className="card animate-fade-in">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0 fw-semibold">{title}</h6>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                        role="progressbar"
                        style={{
                            width: `${progressPercentage}%`,
                            transition: 'width 0.4s ease-in-out'
                        }}
                        aria-valuenow={progressPercentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;