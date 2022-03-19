const express = require('express');
// const app = express();
const router = express.Router();
const mongoose = require('mongoose');



//define scheme
var ParkingSchema = mongoose.Schema({
  name:String, //주차장명
  gu:String, //구
  dong:String, //동
  place:String,//도로명
  num:String, //주차대수
  opday:String, //운영요일
  wds:String, //평일 시작
  wde:String, //평일 마감
  hds:String, //공휴일 시작
  hde:String, //공휴일 마감
  bpt:String, //기본 주차 시간
  bpf:String, //기본 요금
  mpf:String, // 한달 주차 요금
},
  {
    collection : 'testapi'
});

var Parking = mongoose.model('Parking',ParkingSchema);
//DB 리스트 출력하기(完)
router.get('/park/list', function(req, res, next) {
      Parking.find({},{_id : 0},function(err,docs){
           if(err) console.log('err');
           res.send(docs);
      });
})

//DB 구 찾기
router.get('/park/find/gu', function(req, res, next) {
      db = req.db;
      var gu = req.query.gu
      Parking.find({'gu': gu},{_id : 0},function(err,doc){
           if(err) console.log('err');
            res.send(doc);
      });
});

router.get('/park/get', function(req, res, next) {
      db = req.db;
      var name = req.query.name
      Parking.find({'name': name},{_id : 0},function(err,doc){
           if(err) console.log('err');
            res.send(doc);
      });
});

//DB 동 찾기
router.get('/park/find/dong', function(req, res, next) {
      db = req.db;
      var dong = req.query.dong
      Parking.find({'dong': dong},{_id : 0},function(err,doc){
           if(err) console.log('err');
            res.send(doc);
      });
});

router.get('/park/get', function(req, res, next) {
      db = req.db;
      var name = req.query.name
      Parking.find({'name': name},{_id : 0},function(err,doc){
           if(err) console.log('err');
            res.send(doc);
      });
});

//DB 생성
router.post('/insert', function(req, res, next) {
      var name = req.body.name;
      var type = req.body.type;
      var place = req.body.place;
      var dong = req.body.dong;
      var num = req.body.num;
      var disablednum = req.body.disablednum;
      var wpp = req.body.wpp;
      var opday = req.body.opday;
      var wds = req.body.wds;
      var wde = req.body.wde;
      var hds = req.body.hds;
      var hde = req.body.ste;
      var bpt = req.body.bpt;
      var bpf = req.body.bpf;
      var mpf = req.body.mpf;
      var park = new Parking({'name' : name, 'type' : type, 'place' : place, 'dong' : dong, 'num' : num, 'disablednum' : disablednum,
  'wpp' : wpp, 'opday' : opday, 'wds' : wds, 'wde' : wde, 'hds' : hds, 'hde' : hde, 'bpt' : bpt, 'bpf' : bpf, 'mpf' : mpf, 'mpf' : mpf});
      park.save(function(err,silence){
             if(err){
                console.log(err);
                 res.status(500).send('update error');
                         return;
             }
             res.status(200).send("Inserted");
         });
});

//DB 삭제
router.post('/delete', function(req, res, next) {
      var name = req.body.name;
      var park = Parking.find({'name':name});
      park.remove(function(err){
             if(err){
                console.log(err);
                res.status(500).send('delete error');
                return;
             }
             res.status(200).send("Removed");
         });
});

//DB 수정
router.post('/update', function(req, res, next) {
    var name = req.body.name;
    var type = req.body.type;
    var place = req.body.place;
    var dong = req.body.dong;
    var num = req.body.num;
    var disablednum = req.body.disablednum;
    var wpp = req.body.wpp;
    var opday = req.body.opday;
    var wds = req.body.wds;
    var wde = req.body.wde;
    var hds = req.body.hds;
    var hde = req.body.ste;
    var bpt = req.body.bpt;
    var bpf = req.body.bpf;
    var mpf = req.body.mpf;
      Parking.findOne({'name':name},function(err,park){
           if(err){
               console.log(err);
               res.status(500).send('update error');
               return;
          }
          park.type = req.body.type;
          park.place = req.body.place;
          park.dong = req.body.dong;
          park.num = req.body.num;
          park.disablednum = req.body.disablednum;
          park.wpp = req.body.wpp;
          park.opday = req.body.opday;
          park.wds = req.body.wds;
          park.wde = req.body.wde;
          park.hds = req.body.hds;
          park.hde = req.body.ste;
          park.bpt = req.body.bpt;
          park.bpf = req.body.bpf;
          park.mpf = req.body.mpf;
           park.save(function(err,silence){
                  if(err){
                     console.log(err);
                     res.status(500).send('update error');
                     return;
                  }
                  res.status(200).send("Updated");
              });
      });
});

// module.exports = app;
module.exports = router;
