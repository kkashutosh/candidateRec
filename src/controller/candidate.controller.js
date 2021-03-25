const Candidate = require("../models/candidate");
const uuid = require("uuid");

const createCandidate = async (req, res) => {
  try {
    const candidateName = req.body.candidateName;
    const email = req.body.email;
    const password = req.body.password;
    const test_score = req.body.test_score;
   
    
    const candidateData = new Candidate({
      candidateName: candidateName,
      email: email,
      password:password,
      test_score: test_score,
      
    });

    candidateData.candidateId = uuid.v4();

    const  first_round = test_score.first_round
    const  second_round = test_score.second_round
    const  third_round = test_score.third_round

    if( first_round ) {
      candidateData.score = first_round
    }else if(second_round) {
      candidateData.score = second_round
    }else {
      candidateData.score = third_round
    }

    const candidateResult = await candidateData.save();
    console.log(candidateResult)
    if (candidateResult) {
      console.log({ message: "create Candidate successfully", candidateResult });
      res.send(candidateResult);
    }
  } catch (err) {
    console.log("Invalid field error");
    res.status(401).send(err);
  }
};


const readCandidate = async (req, res) => {
  try {
    const score = req.body.score;
    const result = await Candidate.find({ score: score });
    console.log(result);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(401).send(error);
    }
  } catch (err) {
    console.log("Invalid field error");
    res.status(401).send(err);
  }
};

const updateCandidate = async (req, res) => {
  try {
    const candidateId = req.body.candidateId;
    const _id = req.params._id;
    const email = req.body.email;
    const test_score = req.body.test_score;
    const result = await Candidate.findOne({ id: _id, candidateId: candidateId });
    if (result) {
      const updateQuery = { email: email };
      const rc1 = { test_score: test_score };
      const options = { multi: false };
      const query1 = { $set: {} };
      const keysToIgnore = ["candidateId", "candidateName"];
      for (let key in result) {
        if (!keysToIgnore.includes(key)) {
          query1.$set[key] = result[key];
        }
      }
      const queryResult = await Candidate.updateOne(
        updateQuery,
        query1,
        options,
        rc1
      );
      if (!queryResult) {
        console.log({ message: "Internal Server Error" });
      } else {
        console.log({ message: "update Candidate successfully", queryResult });
        res.status(200).send(queryResult);
      }
    } else {
      res.status(401).send(error);
    }
  } catch (err) {
    console.log("Invalid field error");
    res.status(401).send(err);
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const candidateId = req.body.candidateId;
    const _id = req.params._id;
    const result = await Candidate.remove({ id: _id, candidateId: candidateId });
    if (result) {
      res.status(201).send({ message: "delete Candidate Record success" });
    } else {
      res.status(401).send(error);
    }
  } catch (err) {
    console.log("Invalid field error");
    res.status(401).send(err);
  }
};

module.exports = {
  createCandidate,
  readCandidate,
  updateCandidate,
  deleteCandidate,
};
