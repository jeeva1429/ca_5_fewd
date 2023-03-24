import React, { useState , useContext} from "react";
import BooksData from "./BooksData";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "../css/register.css";
import { Link , useNavigate} from "react-router-dom";


function Registration({ setIsLoggedIn }) {
  const [successMessage, setSuccessMessage] = useState(null); // store the variable successMessage and to use it in the setSuccessMessage
  
  const navigate = useNavigate(); // This is to create naviagate object using the useNavigate Hook
  
  // Define a Yup schema object to validate form data
  const schema = Yup.object().shape({
    
  // Validate the firstName field: required, between 3 and 20 characters
    firstName: Yup.string().required("Please enter your first name.").min(3).max(20),
  // Validate the email field: required, must be a valid email address
    email: Yup.string().required("Please enter your email").email(),
  // Validate the password field: required, between 8 and 16 characters
    password: Yup.string().required("password is required").min(8,'Password must be at 8 char long').max(16,'Password must be less than 16 char'),
  // Validate the confirmPwd field: required, must match the password field
   confirmPwd: Yup.string()
      .oneOf([Yup.ref("password")],'Password does not match')
      .required("confirm password is required"),
  });

  
 // Define a form using React Hook Form and pass in the schema object to validate form data
const {
  register, // Register form inputs with React Hook Form
  handleSubmit, // Submit handler for the form
  formState: { errors }, // Track errors in the form
} = useForm({
  resolver: yupResolver(schema), // Use Yup to validate form data against the schema object
});

// Submit handler function that sets a success message and navigates back to the BooksData component
const onSubmit = (data) => {
  setSuccessMessage("Form submitted successfully"); // Set the success message
  setTimeout(() => {
    navigate('/'); // Navigate back to BooksData component after 1 second
  }, 1000);
};

  

  return (
    <>
    
  <div className="Form">

  {/* Display a heading for the form */}
  <h1>Sign Up</h1>

  {/* Define the form and attach the handleSubmit() and onSubmit() functions */}
  <form onSubmit={handleSubmit(onSubmit)}>

    {/* Define an input field for the firstName */}
    <input
      {...register("firstName", { required: true })}
      placeholder="First Name"
    />

    {/* Display an error message if there's an error with the firstName field */}
    {errors.firstName && <p>{errors.firstName.message}</p>}

    {/* Define an input field for the email */}
    <input {...register("email")} placeholder="Email" />

    {/* Display an error message if there's an error with the email field */}
    {errors.email && <p>{errors.email.message}</p>}

    {/* Define an input field for the password */}
    <input {...register("password")} placeholder="Password" type="password" />

    {/* Display an error message if there's an error with the password field */}
    {errors.password && <p>{errors.password.message}</p>}

    {/* Define an input field for the confirm password */}
    <input
      {...register("confirmPwd")}
      placeholder="Confirm Password"
      type="password"
    />

    {/* Display an error message if there's an error with the confirm password field */}
    {errors.confirmPwd && <p>{errors.confirmPwd.message}</p>}

    {/* Define a button to submit the form */}
    <button type="submit">Submit</button>
  </form>

  {/* Display a success message if the form is submitted successfully */}
  {successMessage && <p>{successMessage}</p>}
  </div>
  </>
  );
}

export default Registration;
