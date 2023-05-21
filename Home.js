import React, {useState} from "react";
import HTMLParser from "fast-html-parser";
import {ActivityIndicator, Dimensions, FlatList, Image, ScrollView, Text, TouchableHighlight, View} from "react-native";
import styles from "./styles";


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

function detectURLs(message) {
    let urlRegex = /(((https?:\/\/)|(www\.))\S+)/g;
    return message.match(urlRegex)
}

function Home ({ navigation }) {
    const stories = [{id: 1, pic: "https://x-waters.com/wp-content/uploads/2020/01/xw_ufa_main.jpg"},
        {id: 2, pic: "https://x-waters.com/wp-content/uploads/2020/01/xw_ufa_main.jpg"},
        {id: 3, pic: "https://x-waters.com/wp-content/uploads/2020/01/xw_ufa_main.jpg"},
        {id: 4, pic: "https://x-waters.com/wp-content/uploads/2020/01/xw_ufa_main.jpg"},
        {id: 5, pic: "https://x-waters.com/wp-content/uploads/2020/01/xw_ufa_main.jpg"},
        {id: 6, pic: "https://x-waters.com/wp-content/uploads/2020/01/xw_ufa_main.jpg"},
        {id: 7, pic: "https://x-waters.com/wp-content/uploads/2020/01/xw_ufa_main.jpg"},
        {id: 8, pic: "https://x-waters.com/wp-content/uploads/2020/01/xw_ufa_main.jpg"},
        {id: 9, pic: "https://x-waters.com/wp-content/uploads/2020/01/xw_ufa_main.jpg"}];

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    let request = new XMLHttpRequest();
    request.onreadystatechange = e => {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status === 200) {
            let HTMLParser = require('fast-html-parser');
            let root = HTMLParser.parse(request.responseText);
            let elems = root.querySelectorAll(".project_itm");
            for (let i = 0; i < elems.length; i++) {
                // name elems[i].querySelector(".project_itm__title")["childNodes"][0]['rawText']
                // desc elems[i].querySelector(".project_itm__desc")["childNodes"][0]['rawText']
                // dates  elems[i].querySelector(".project_itm__date")["childNodes"][0]['rawText']
                // type elems[i].querySelector(".project_itm__attr")["childNodes"][0]['rawText']
                // pic elems[i].querySelector(".project_itm__bg")["childNodes"][0]['rawText']
                // console.log(detectURLs(elems[i]["rawAttrs"]));
                let types = elems[i].querySelectorAll(".project_itm__attr .project_itm__category");
                // console.log(types);
                let tps = [];
                for (let i = 0; i < types.length; i++) {
                    tps.push([types[i]['childNodes'][0]["rawText"], i])
                }
                // console.log(tps);


                //console.log(elems[i].querySelector(".project_itm__title")["childNodes"][0]["rawText"]);
                //console.log(detectURLs(elems[i].querySelector(".project_itm__bg")["rawAttrs"])[0]);
                data[i] = {'name': elems[i].querySelector(".project_itm__title")["childNodes"][0]["rawText"],
                    'desc': elems[i].querySelector(".project_itm__desc")["childNodes"][0]['rawText'],
                    'date': elems[i].querySelector(".project_itm__date")["childNodes"][0]['rawText'],
                    'pic': detectURLs(elems[i].querySelector(".project_itm__bg")["rawAttrs"])[0],
                    'types': tps,
                    'uri': detectURLs(elems[i]["rawAttrs"])[0],
                    'key': i}
            }
        } else {
            console.warn(request.status);
        }
        setLoading(false)
    };
    request.open('GET', 'https://www.x-waters.com/');
    request.send();
    // console.log(data);
    return (
        <ScrollView>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{padding: 20, height: 110, paddingBottom: 0}}>
                {stories.map(a=>{
                    return <Image key={a.id} source={{uri: a["pic"]}} style={{width: 70, height: 70, borderRadius: 1000, marginRight: a.id == stories[stories.length-1].id ? 30 : 15, borderColor: "red", borderWidth: 2}}/>
                })}
            </ScrollView>
            <View style={styles.swims} contentContainerStyle={{ flex: 1 }}>
                <Text style={styles.tabTitle}>Все старты</Text>
                {isLoading ? <ActivityIndicator size="large" color="#0000ff" style={ {paddingVertical: 10} }/> :
                    <FlatList
                        scrollEnabled={false}
                        data={data}
                        renderItem={({item}) =>
                            <TouchableHighlight style={{position: "relative", marginTop: 5}} onPress={() => navigation.navigate('Swim', {
                                "name": item.name, "uri":  item.uri
                            })}>
                                <View>
                                    <Image source={{uri: item.pic}} style={ {width: deviceWidth, height: 260, flex: 1} }/>

                                    <Text style={styles.swimListName}>{item.name}</Text>
                                    <View style={styles.datedesc}>
                                        <View style={styles.swimTypes}>{item.types.map((item) => (
                                            <Text style={styles.swimListType} key={item[1]}>{item[0]}</Text>
                                        ))}</View>
                                        <Text style={styles.swimListDate}>{item.date}</Text>
                                        <Text style={styles.swimListDesc}>{item.desc}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight >
                        }
                        keyExtractor={item => item.key}
                    />}
            </View>
        </ScrollView>
    );
}


 export default Home;