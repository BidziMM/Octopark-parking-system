const TerminalService = require('../services/terminal')

module.exports.payment = async (req, res, next) => {
    try {
      const terminal = new TerminalService()
      if(!req.body || !req.body.parkingPrice || req.body.parkingPrice === 0){
        return next({err:{status:400, message:"Warość płatności jest równa 0 zł"}});
      }
      terminal.hello(req.body.parkingPrice)
      //console.log("Data z terminala" + d)
      res.status(200).json({})
    } catch (error) {
      console.log(error)
      return next();
    }
  };