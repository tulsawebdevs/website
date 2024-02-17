export default function ProjectsTab() {
  return (
    <div className="flex flex-wrap">
      <div>
        <h1 className="text-3xl font-bold">Hack Night</h1>
        <p className="text-lg">This is a description of the hack night.</p>
      </div>
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-lg">
          These are the projects that were worked on during the hack night.
        </p>
      </div>
      <div>
        <h1 className="text-3xl font-bold">Resources</h1>
        <p className="text-lg">
          These are the resources that were used during the hack night.
        </p>
      </div>
    </div>
  );
}
