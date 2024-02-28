type Proposal = {
  name: string;
  score: number;
  userVote: number;
};

interface VotingProps {
  proposals: Proposal[];
}

const Voting: React.FC<VotingProps> = ({ proposals }) => {
  return (
    <>
      <div className="px-12 w-full">
        <h1 className="pb-12">Vote Here</h1>
        <div className="grid grid-cols-2 items-center">
          {proposals.map((proposal) => (
            <div className="p-8 text-center">
              <h1>{proposal.name}</h1>
              <h2>Score: {proposal.score}</h2>
              <div className="text-lg">
                <select name="rate" value={'neutral'} id="rate">
                  <option value="strongly-interested">
                    strongly interested: +2
                  </option>
                  <option value="slightly-interested">
                    slightly interested: +1
                  </option>
                  <option value="neutral">neutral: +0</option>
                  <option value="slightly-disinterested">
                    slightly disinterested: -1
                  </option>
                  <option value="strongly-disinterested">
                    strongly disinterested: -2
                  </option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Voting;
