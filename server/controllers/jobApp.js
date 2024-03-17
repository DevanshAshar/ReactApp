const User=require('../models/user')
const Job=require('../models/job')
const jobApp=require('../models/jobApp')
const createJobApp=async(req,res)=>{
    const { jobId } = req.body;
    console.log(req.body)
  try {
    const app= await jobApp.create({
      JobId: jobId,
      UserId: userData.id
    });
    const latestJobApp = await jobApp.findOne({
        order: [['id', 'DESC']], 
      });
    await latestJobApp.destroy()
    return res.code(201).send({ success: true, data: app });
  } catch (error) {
    console.error('Error adding JobApp:', error);
    return res.code(500).send({ success: false, error: error.message });
  }
}
const getAllJobApps = async (req, res) => {
    try {
      const jobApps = await jobApp.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: Job,
            attributes: ['id', 'company', 'role']
          }
        ]
      });
      if (jobApps) {
        return res.code(200).send({ success: true, data: jobApps });
      } else {
        return res.code(404).send({ success: false, error: 'No JobApps found' });
      }
    } catch (error) {
      console.error('Error fetching JobApps:', error);
      return res.code(500).send({ success: false, error: error.message });
    }
  };
module.exports={createJobApp,getAllJobApps}