---
title: BMI计算器
url: 24.html
id: 24
comments: false
date: 2020-07-16 20:41:45
---

# 瘦瘦做一个简易的BMI计算器，
# 方便大家计算自己的体质指数。

<escape>
<body>
 <form method="get" style="background:#E8E8E8" action="">
  <h2>体质指数BMI计算器</h2>
  <p>请输入您的体重(单位：kg)：<input type="text" style="width:150px;height:30px" id="weight"></p>
  <p>请输入您的身高(单位：m)：<input type="text" style="width:150px;height:30px" id="height"><p>
   <p>您的体重指数BMI=<input type="text" style="width:220px;height:30px"  readonly="readonly" id="bmi"><p>
  <input type="button" style="width:180px;height:50px;font-size:18px" value="计算您的BMI" onclick="show()" />
  <input type="reset" style="width:180px;height:50px;font-size:18px" value="重新输入数据" />
<script type="text/javascript">
 function bmi(weight,height){
  var weight=document.getElementById("weight").value;//获取体重
  var height=document.getElementById("height").value;//获取身高
  var bmi=weight/(Math.pow(height,2));//计算BMI
  return bmi;
 }
 function show(){
  //输出BMI
  document.getElementById("bmi").value=bmi(weight,height);
 }
</script>
</form>

 </escape> 
 
 ## 目前，我国成人BMI切点范围说明
 ## 1.  BMI<18.5  消瘦；
 ## 2.  **18.5≤BMI<24 正常**；
 ## 3.  24≤BMI<28超重
 ## 4.  BMI≥28 肥胖

 ### 当您的BMI≥24时，就必须要控制体重了哦，
 ### 否则会有很多慢性病找上门来，
 ### 当您坚持不下去的时候，
 ### 可以看看瘦瘦博客中的专栏“管理体重”，
 ### 向着健康坚定不移的出发！！！