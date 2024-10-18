// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

var AWS = require('aws-sdk');
var S3 = require('aws-sdk/clients/s3');
const formidable = require('formidable');
var fs = require('fs');
// import { getSession } from 'next-auth/client'

AWS.config.update({
  region: 'ru-msk',
  endpoint: 'https://hb.vkcs.cloud',
  accessKeyId: 'wL98Kj53bGek7TF3WV3L4T',
    secretAccessKey: 'f3nny9Qr2BMaU7sRCNkzQuicUkuwCagzhGbcvbrmxzPo'
});

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function (req, res)  {
    // const session = await getSession({req});
    let s3 = new AWS.S3();
    const form = formidable({ multiples: true });
    const user = ''
    // const user = await getUserByEmail(session.user.email);
    //console.log('user');
    //console.log(user);
   // console.log('go in');
    if(user!==null) {

        let userId = '6606e2dd22428850e0b5bf4f';

        return new Promise( (resolve,reject) => {
            //console.log('1');
            form.parse(req, (err, fields, files) => {
                if(files.file!==undefined) {
                    //console.log('2');
                    fs.readFile(files.file.path, async (err, data) => {
                        //console.log('3');
                        if (!err) {
                            /*let key = "users/" + userId + "/"+fields.activityNumber.toString()+
                                "/"+fields.variant+
                                "/"+fields.taskId+"."+ files.file.name.split('.').pop();*/
                                //console.log('4');
                            let key = "users/" + userId + "/"+fields.activityNumber.toString()+
                                "/"+Date.now().toString()+"."+ files.file.name.split('.').pop();
                            let params = {Body: data,Bucket: "quizzezimages",'Key': key,ACL: "public-read"};
                            let putObjectPromise = s3.putObject(params).promise();
                            //console.log('5');
                            await putObjectPromise.then( (data) => {
                                //console.log('6');
                                res.status(200).json({'result':'ok', 'url':key});    // successful response
                                return resolve();
                            }).catch();
                        } else {
                            console.log('Reject File Uploader');
                            return reject();
                        }
                    });
                }
                else {
                    console.log('Reject File Uploader');
                    return reject();
                }
            });
        });
    }
    else {
        //console.log('7');
        res.status(200).json({'result':'no'});
        return 0;
    }
}