# API 列表

## 上传、获得全部博客和获得特定博客

- GET 47.94.252.67:3000/posts
```json
[
    {
        "_id": "59ad5d38e9a19492cb5ea1cd",
        "text": "init",
        "__v": 13,
        "comments": [
            {
                "text": "add comments",
                "_id": "59b4cac737f382d388e45c6d",
                "votes": 2,
                "updatedAt": "2017-09-10T05:17:57.210Z",
                "createdAt": "2017-09-10T05:16:55.565Z"
            },
            {
                "text": "second comment",
                "_id": "59b4c17637f382d388e45c6b",
                "votes": 1,
                "updatedAt": "2017-09-10T05:15:36.811Z",
                "createdAt": "2017-09-10T04:37:10.289Z"
            }
        ],
        "createdAt": "2017-09-04T14:03:36.382Z"
    }
]
```
- POST 47.94.252.67:3000/posts
```json
[
  {
      "_id": "59b4d4772805bdd542fbef23",
      "text": "second artical",
      "__v": 0,
      "comments": [],
      "createdAt": "2017-09-10T05:58:15.363Z"
  },
	{
			"_id": "59ad5d38e9a19492cb5ea1cd",
			"text": "init",
			"__v": 13,
			"comments": [
					{
							"text": "add comments",
							"_id": "59b4cac737f382d388e45c6d",
							"votes": 2,
							"updatedAt": "2017-09-10T05:17:57.210Z",
							"createdAt": "2017-09-10T05:16:55.565Z"
					},
					{
							"text": "second comment",
							"_id": "59b4c17637f382d388e45c6b",
							"votes": 1,
							"updatedAt": "2017-09-10T05:15:36.811Z",
							"createdAt": "2017-09-10T04:37:10.289Z"
					}
			],
			"createdAt": "2017-09-04T14:03:36.382Z"
	}
]
```
- GET /posts/:id
```json
{
    "_id": "59b4d4772805bdd542fbef23",
    "text": "second artical",
    "__v": 0,
    "comments": [],
    "createdAt": "2017-09-10T05:58:15.363Z"
}
```

## 上传评论、修改和删除指定评论
- POST /post/:id/comments
```json
{
    "_id": "59b4d4772805bdd542fbef23",
    "text": "second artical",
    "__v": 1,
    "comments": [
        {
            "text": "good job",
            "_id": "59b4d6432805bdd542fbef25",
            "votes": 0,
            "updatedAt": "2017-09-10T06:05:55.571Z",
            "createdAt": "2017-09-10T06:05:55.571Z"
        },
        {
            "text": "too simple",
            "_id": "59b4d6432805bdd542fbef24",
            "votes": 0,
            "updatedAt": "2017-09-10T06:05:55.571Z",
            "createdAt": "2017-09-10T06:05:55.571Z"
        }
    ],
    "createdAt": "2017-09-10T05:58:15.363Z"
}
```
- PUT /posts/:qID/comments/:aID
```json
{
    "_id": "59b4d4772805bdd542fbef23",
    "text": "second artical",
    "__v": 2,
    "comments": [
        {
            "text": "modify comment",
            "_id": "59b4d6432805bdd542fbef25",
            "votes": 0,
            "updatedAt": "2017-09-10T06:06:51.583Z",
            "createdAt": "2017-09-10T06:05:55.571Z"
        },
        {
            "text": "too simple",
            "_id": "59b4d6432805bdd542fbef24",
            "votes": 0,
            "updatedAt": "2017-09-10T06:05:55.571Z",
            "createdAt": "2017-09-10T06:05:55.571Z"
        }
    ],
    "createdAt": "2017-09-10T05:58:15.363Z"
}
```
- DELETE /posts/:qID/comments/:aID
```json
{
    "_id": "59b4d4772805bdd542fbef23",
    "text": "second artical",
    "__v": 3,
    "comments": [
        {
            "text": "too simple",
            "_id": "59b4d6432805bdd542fbef24",
            "votes": 0,
            "updatedAt": "2017-09-10T06:05:55.571Z",
            "createdAt": "2017-09-10T06:05:55.571Z"
        }
    ],
    "createdAt": "2017-09-10T05:58:15.363Z"
}
```

# 投票
- POST /posts/:qID/comments/:aID/vote-up
- POST /posts/:qID/comments/:aID/vote-down
