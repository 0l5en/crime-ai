import { components } from "@/openapi/crimeAiSchema";

type QuestionAndAnswerDto = components["schemas"]["QuestionAndAnswerDto"];

const ConversationHistory = ({questionAndAnswers, pending}:{questionAndAnswers: QuestionAndAnswerDto[], pending: boolean}) => {
    return (
      <div>
        <h3 className="h4 text-white mb-3">Conversation History</h3>
        
        {pending ? (
          <div className="text-center text-muted">
            <p>Loading conversation...</p>
          </div>
        ) : questionAndAnswers.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {questionAndAnswers.map((qa, index) => (
              <div key={index} className="card bg-dark border-secondary">
                <div className="card-body p-3">
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-start gap-2">
                      <span className="badge bg-primary mt-1">
                        Q
                      </span>
                      <p className="text-white flex-grow-1 mb-0">{qa.question}</p>
                    </div>
                    <div className="d-flex align-items-start gap-2">
                      <span className="badge bg-success mt-1">
                        A
                      </span>
                      <p className="text-muted flex-grow-1 mb-0">{qa.answer}</p>
                    </div>
                    <p className="small text-muted text-end mb-0">
                      {new Date(qa.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted">
            <p>No questions asked yet. Start the interrogation by asking a question above.</p>
          </div>
        )}
      </div>
    );
}

export default ConversationHistory;