const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const candidateSchema = new mongoose.Schema({
  candidateId: {
    type: String,
  },

  candidateName: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id all ready exist"],
    Validate(value) {
      if (!Validate.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String
  },
  score: {
    type:Number
  },
  test_score: {
    first_round: Number,
    second_round: Number,
    third_round: Number,
  },
});

candidateSchema.pre('save', async function(next) {
  console.log('hii')
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  next()
})

const Candidate = new mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
