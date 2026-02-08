export const Site = () => {
  return (
    <div className="flex flex-col p-4">
      <h1 className="font-bold">Site</h1>
      <a className="underline" href="/lost"><p>Lost</p></a>
      <a className="underline" href="/report-lost"><p>Report Lost</p></a>
      <a className="underline" href="/found"><p>Found</p></a>
      <a className="underline" href="/report-found"><p>Report Found</p></a>
      <a className="underline" href="/search"><p>Search</p></a>
      <a className="underline" href="/additional-information"><p>More information</p></a>
    </div>
  );
};
