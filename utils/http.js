
export function requestGet(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: "GET",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}

// export function requestPost(url, data) {
// 	return new Promise((resolve, reject) => {
// 		uni.request({
// 			url: baseUrl + url,
// 			header: {
// 				'Content-Type': 'application/x-www-form-urlencoded'
// 			},
// 			method: "POST",
// 			data: data,
// 			success: function(res) {
// 				resolve(res.data)
// 			},
// 			fail: function(err) {
// 				reject(err)
// 			}
// 		})
// 	})
// }


// 听书接口
export const getBookMenuURL = "https://m.lrts.me/ajax/getBookMenu/";
export const getResourceListURL = "https://m.lrts.me/ajax/getResourceList?dsize=100&entityType=1&pageNum=1&entityId=";
export const getPlayPathURL = "https://m.lrts.me/ajax/getPlayPath/";
export const getBookDetailURL = "https://m.lrts.me/ajax/getBookDetail/"

// 轮播图接口
export const bannerURL = "https://b.zhuishushenqi.com/category/classifylist?node=bf0a65255a5b4c138052dca8ef065753"; //GET请求
// 首页接口
export const homeURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?gender=0&actionid=9062" //get 请求
// 更多书籍接口
export const listURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9004&id=2&type=3&take=20&pageIndex=" //get 请求
//榜单接口
export const rankURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9008"
// base接口
export const baseURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?"
// 分类接口
export const classifyURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9009"
// 搜索接口
export const searchURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9014&keyword="

export const bookInfoURL = "https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?gender=0&actionid=9002&bookId="   //GET请求bookid=1046177
export const bookPageURL = "https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?sid=1211e0fbc6fdc938a715ff6b68aaf9a7&chl=small_xiaoan&guid=obzfs0K9HrrxhPC_O0GG5oQfuwPI&isSmall=1&platform=1&device=microsoft&sysreleasever=Windows%2010%20x64&gender=0&nonce=46d13766-adc4-eaaa-d010-bd58a2a6f2ae&timestamp=1635840800535&mt=12&over=355&ver=355&appver=3.5.7&x=4&actionid=9007&"  //GET请求 {bookid}?view=chapters
export const chapterURL = "https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9005&bookid="
export const staticURL = "https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?"

