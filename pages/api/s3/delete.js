

const AWS = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3');
//import { getSession } from 'next-auth/client'
AWS.config.update({
    region: 'ru-msk',
    endpoint: 'https://hb.vkcs.cloud',
    accessKeyId: 'wL98Kj53bGek7TF3WV3L4T',
      secretAccessKey: 'f3nny9Qr2BMaU7sRCNkzQuicUkuwCagzhGbcvbrmxzPo'
  });

export default async function (req, res) {
    let s3 = new AWS.S3();
    const user = ''
    let key = req.body.split('?t')[0];
    //console.log('req.body');
    //console.log(key);
    let userId = '6606e2dd22428850e0b5bf4f';
    return new Promise(async (resolve, reject) => {
        //let key = req.body.key;
        //console.log('user', user);
        //console.log('key', key);
        if (user !== null && key.includes(userId.toString())) {
            //console.log('try to delete');
            let params = { Bucket: "quizzezimages", 'Key': key };
            let deleteObjectPromise = s3.deleteObject(params).promise();
            await deleteObjectPromise.then(() => {
                res.status(200).json({ 'result': 'ok' });    // successful response
                return resolve(1);
            }).catch();
        }
        else {
            console.log('error to delete');
            //res.status(200).json({'result':'no'});
            return reject(0);
        }
    });

}