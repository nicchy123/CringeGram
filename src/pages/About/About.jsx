import React from 'react';

const About = () => {
    const handleForm = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
          .then((user) => {
            console.log(user.user);
            event.target.reset();
            navigate("/");
          })
          .catch((error) => setError(error.message));
      };
    return (
        <div className="hero w-full my-20">
        <div className="hero-content ">
          <form
            onSubmit={handleForm}
            className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100 py-5"
          >
            <h1 className="text-4xl font-bold text-center">About</h1>
            <div className="card-body w-full">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered lg:w-96 w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
          
              </div>
            
             
             
            </div>
          </form>
        </div>
      </div>
    );
};

export default About;