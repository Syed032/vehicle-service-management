const Home = () => {
  return (
    <div style={{ width: "60%", margin: "auto", marginTop: "40px" }}>
      <h2>Welcome to Vehicle Service App</h2>

      <p>Select an option:</p>

      <ul>
        <li><a href="/add-user">Add User</a></li>
        <li><a href="/users">View Users</a></li>

        <li><a href="/add-vehicle">Add Vehicle</a></li>
        <li><a href="/vehicles">View Vehicles</a></li>

        <li><a href="/add-slot">Add Slot</a></li>
        <li><a href="/slots">View Slots</a></li>
      </ul>
    </div>
  );
};

export default Home;
