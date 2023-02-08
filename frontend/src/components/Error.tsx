const Error = ({ error }: any): JSX.Element | null => {
  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        data-cy="error"
      >
        <strong className="font-bold">An errour occured</strong>
        <span className="block">{error.message || JSON.stringify(error)}</span>
      </div>
    );
  }

  return null;
};

export default Error;
