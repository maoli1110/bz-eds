var BzCloudComp; 
	if(!BzCloudComp) 
	BzCloudComp = {};	
	(function() {
		// »ñÈ¡¹¹¼þµÄ×´Ì¬ ·µ»ØÖµ(0 ÏÂÔØ 1 ¸üÐÂ 2 Ó¦ÓÃ)
		BzCloudComp.GetCompType = function(type, strCompGUID, strCompMd5, strCompID, strSourceCompId, strVersion)
		{
			alert(type, strCompGUID, strCompMd5, strCompID, strSourceCompId, strVersion);
		};

		// Ó¦ÓÃ¹¹¼þ
		BzCloudComp.UseComp = function(type, strCompGUID, strCompID, strSourceCompId)
		{
			alert(type, strCompGUID, strCompID, strSourceCompId);
		};

		// »ñÈ¡¹¹¼þµÄÏêÏ¸ÐÅÏ¢ ·µ»ØÖµ(json[{"key":"","value":"","name":""}])
		BzCloudComp.GetCompDetail = function(type, strCompGUID, strCompID, strSourceCompId)
		{
			alert(type, strCompGUID, strCompID, strSourceCompId);
		};

		// ÅúÁ¿ÏÂÔØ
		BzCloudComp.BatchDownloadComp = function(strJson)
		{
			alert(strJson);
		};

		// »ñÈ¡ÉÏ´«¹¹¼þ ·µ»ØÖµ({"name":"","Identify":"","tier":"","type":"", "status":"","children":""})
		BzCloudComp.GetUpLoadDetail = function()
		{
			return "{
    "name": "构件库",
    "value": "0",
    "type": "0",
    "tier": "0",
    "status": "0",
    "children": [
        {
            "name": "自定义",
            "value": "0",
            "type": "0",
            "tier": "1",
            "status": "0",
            "children": [
                {
                    "name": "户型",
                    "value": "0",
                    "type": "0",
                    "tier": "2",
                    "status": "0",
                    "children": [
                        {
                            "name": "墙",
                            "value": "0",
                            "type": "0",
                            "tier": "3",
                            "status": "0",
                            "children": [
                                {
                                    "name": "自定义墙_副本",
                                    "value": "885AFDFF-6452-4611-9513-741FDFECD80A",
                                    "type": "1",
                                    "tier": "4",
                                    "status": "1"
                                },
                                {
                                    "name": "240砖墙_副本",
                                    "value": "1A387ED2-2343-44F3-A131-5E548D2B52E6",
                                    "type": "1",
                                    "tier": "4",
                                    "status": "1"
                                },
                                {
                                    "name": "自定义墙_副本1",
                                    "value": "4C47B7D6-4CE3-46E6-B8B1-B30B7FDA1F74",
                                    "type": "1",
                                    "tier": "4",
                                    "status": "1"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "硬装",
                    "value": "0",
                    "type": "0",
                    "tier": "2",
                    "status": "0",
                    "children": [
                        {
                            "name": "吊柜",
                            "value": "0",
                            "type": "0",
                            "tier": "3",
                            "status": "0",
                            "children": [
                                {
                                    "name": "现代吊柜01_副本",
                                    "value": "501476AA-7731-4D92-8A58-B95B1D2E7C26",
                                    "type": "73",
                                    "tier": "4",
                                    "status": "1"
                                },
                                {
                                    "name": "现代吊柜02_副本",
                                    "value": "CA789CE3-B274-472F-8DC8-0CED145CA207",
                                    "type": "73",
                                    "tier": "4",
                                    "status": "1"
                                },
                                {
                                    "name": "现代吊柜01_副本1",
                                    "value": "C914A0F6-E028-4DAA-B8CE-BE709134CE33",
                                    "type": "73",
                                    "tier": "4",
                                    "status": "1"
                                },
                                {
                                    "name": "中式吊柜02_副本",
                                    "value": "BEA80FC6-1D44-4F82-A3CE-B1B28F9209EC",
                                    "type": "73",
                                    "tier": "4",
                                    "status": "1"
                                },
                                {
                                    "name": "中式吊柜03_副本",
                                    "value": "7DD4194A-2A96-46CD-83D1-F5D05E9D7D2D",
                                    "type": "73",
                                    "tier": "4",
                                    "status": "1"
                                },
                                {
                                    "name": "中式吊柜02_副本1",
                                    "value": "E640BB7E-23F0-4792-B92A-F467A67F6828",
                                    "type": "73",
                                    "tier": "4",
                                    "status": "1"
                                },
                                {
                                    "name": "欧式吊柜01_副本",
                                    "value": "BE03EA24-B8EF-41AA-AC7B-B46A9B72FD67",
                                    "type": "73",
                                    "tier": "4",
                                    "status": "1"
                                },
                                {
                                    "name": "欧式吊柜03_副本",
                                    "value": "9505BFC7-DBC0-4A86-AABB-DEF8ED0F35B7",
                                    "type": "73",
                                    "tier": "4",
                                    "status": "1"
                                },
                                {
                                    "name": "四门吊柜01_副本",
                                    "value": "C1500AAD-B63E-4906-BD71-464D07BFBFF5",
                                    "type": "73",
                                    "tier": "4",
                                    "status": "1"
                                },
                                {
                                    "name": "四门吊柜01_副本1",
                                    "value": "7D6E74D2-B4C1-40F3-93DF-7739CC1C565A",
                                    "type": "73",
                                    "tier": "4",
                                    "status": "1"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "水电暖",
                    "value": "0",
                    "type": "0",
                    "tier": "2",
                    "status": "0",
                    "children": [
                        {
                            "name": "壁灯",
                            "value": "0",
                            "type": "0",
                            "tier": "3",
                            "status": "0",
                            "children": [
                                {
                                    "name": "壁灯1_副本",
                                    "value": "347CCFAE-ED8D-4009-9679-9998C55B8002",
                                    "type": "57",
                                    "tier": "4",
                                    "status": "1"
                                },
                                {
                                    "name": "新构件",
                                    "value": "44B87633-3763-447A-80DA-D069299AAFD5",
                                    "type": "57",
                                    "tier": "4",
                                    "status": "1"
                                }
                            ]
                        },
                        {
                            "name": "射灯",
                            "value": "0",
                            "type": "0",
                            "tier": "3",
                            "status": "0",
                            "children": [
                                {
                                    "name": "射灯1_副本",
                                    "value": "57552124-55E5-4810-AF63-1490DF44FB4B",
                                    "type": "66",
                                    "tier": "4",
                                    "status": "1"
                                },
                                {
                                    "name": "新构件",
                                    "value": "6C71644C-2A0E-48CB-A9BD-7CC80C1191D0",
                                    "type": "66",
                                    "tier": "4",
                                    "status": "1"
                                }
                            ]
                        },
                        {
                            "name": "筒灯",
                            "value": "0",
                            "type": "0",
                            "tier": "3",
                            "status": "0",
                            "children": [
                                {
                                    "name": "新构件",
                                    "value": "92F61FC3-785B-4EF1-B661-7FB13D71C053",
                                    "type": "65",
                                    "tier": "4",
                                    "status": "1"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}";
		};

		// ÉÏ´«
		BzCloudComp.UpLoadDetail = function(IsPublic, strJson, strStruct)
		{
			alert(IsPublic, strJson, strStruct);
		};
})();	