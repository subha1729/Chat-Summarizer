function ProfilePanel(){

  return(

    <div className="dashboard-profile">

      <div
        style={{
          textAlign:"center"
        }}
      >

        <div
          style={{
            width:"70px",
            height:"70px",
            borderRadius:"50%",
            background:"#7c3aed",
            margin:"0 auto 15px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            fontSize:"28px",
            fontWeight:"bold"
          }}
        >
          S
        </div>

        <h3>
          Subha
        </h3>

        <p>
          Discord Connected
        </p>

      </div>

    </div>

  );

}

export default ProfilePanel;