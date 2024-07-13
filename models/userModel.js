const mongoose = require("mongoose"); // Import the mongoose library to interact with MongoDB

// Define the schema for the user collection
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String, // Define the data type as String
      required: [true, "role is required"], // Role is required and will return a custom error message if not provided
      enum: ["admin", "organisation", "donar", "hospital"], // Restrict the values of role to these specified options
    },
    name: {
      type: String, // Define the data type as String
      required: function () {
        // Custom required function to determine if name is required based on role
        if (this.role === "user" || this.role === "admin") {
          return true; // Name is required for users and admins
        }
        return false; // Name is not required for other roles
      },
    },
    organisationName: {
      type: String, // Define the data type as String
      required: function () {
        // Custom required function to determine if organisationName is required based on role
        if (this.role === "organisation") {
          return true; // organisationName is required for organisations
        }
        return false; // organisationName is not required for other roles
      },
    },
    hospitalName: {
      type: String, // Define the data type as String
      required: function () {
        // Custom required function to determine if hospitalName is required based on role
        if (this.role === "hospital") {
          return true; // hospitalName is required for hospitals
        }
        return false; // hospitalName is not required for other roles
      },
    },
    email: {
      type: String, // Define the data type as String
      required: [true, "email is required"], // Email is required and will return a custom error message if not provided
      unique: true, // Ensure email is unique across the user collection
    },
    password: {
      type: String, // Define the data type as String
      required: [true, "password is required"], // Password is required and will return a custom error message if not provided
    },
    website: {
      type: String, // Define the data type as String
    },
    address: {
      type: String, // Define the data type as String
      required: [true, "address is required"], // Address is required and will return a custom error message if not provided
    },
    phone: {
      type: String, // Define the data type as String
      required: [true, "phone number is required"], // Phone number is required and will return a custom error message if not provided
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields to the schema
);

// Export the user model based on the schema
module.exports = mongoose.model("users", userSchema);
