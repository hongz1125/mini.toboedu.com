** 启动服务

pm2 start serve/index --name "英语"



** 获取信息

fetch('https://www.shanbay.com/api/v1/bdc/search/?word=pepper').then(response => response.json())
  .then(data => console.log(JSON.stringify({
	id:data.data.id,
	en:data.data.content,
	en_s:`/${data.data.pronunciation}/`,
	cn:data.data.definition,
})))
  .catch(e => console.log("Oops, error", e))
