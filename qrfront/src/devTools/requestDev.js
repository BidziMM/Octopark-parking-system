import {printDevError} from '../Api'

export const errorPrinter = async (setErr) => {
    try{
      await printDevError()
      .catch((err) => {
        setErr({title:"Drukarka", msg:"Nie można wydrukować biletu"})
        throw err
      })
    }catch(err){
      console.log(err)
    }
}