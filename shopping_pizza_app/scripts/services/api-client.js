// http / https call
import url from '../utils/constant.js'

async function makenwcall(){
   try{
      const response = await fetch(url);
      const obj = await response.json();
      return obj;
      }
      catch(err)
      {
         console.log("ERROR OCCURED",err);
         throw(err);
      }
}

makenwcall();
export default makenwcall;
