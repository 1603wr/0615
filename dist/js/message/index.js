define(["jquery"],function(a){a(".sub").on("click",function(){var e=a(".text-box").val(),t=a(".text").val();if(""!==e&&""!==t){a(this).text();a.ajax({url:"/api/data",data:{address:encodeURIComponent(e),cause:encodeURIComponent(t),datetime:1*Date.parse(new Date)},dataType:"json",success:function(e){1==e.result&&(window.location.href="../index.html")}})}else alert("不能为空")})});