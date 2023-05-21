import React, {useState} from "react";
import HTMLParser from "fast-html-parser";
import {ActivityIndicator, FlatList, ScrollView, Text, TouchableNativeFeedback, View} from "react-native";
import styles from "./styles";

function detectURLs(message) {
    let urlRegex = /(((https?:\/\/)|(www\.))\S+)/g;
    return message.match(urlRegex)
}


function Results ({ navigation }) {
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
            let elems = root.querySelectorAll(".result-page-event");
            for (let i = 0; i < elems.length; i++) {
                // name elems[i].querySelector(".result-page-event__name")["childNodes"][0]['rawText']
                // motto elems[i].querySelectorAll(".result-page-event__desc")[1]["childNodes"][0]['rawText']
                // console.log(detectURLs(elems[i].querySelector("a")["rawAttrs"])[0]);
                data[i] = {'name': elems[i].querySelector(".result-page-event__name")["childNodes"][0]['rawText'],
                    'desc': elems[i].querySelectorAll(".result-page-event__desc")[1]["childNodes"][0]['rawText'],
                    'uri': detectURLs(elems[i].querySelector("a")["rawAttrs"])[0],
                    'key': i}
            }
        } else {
            console.warn('error');
        }
        setLoading(false)
    };
    request.open('GET', 'https://x-waters.com/result/');
    request.send();
    // console.log(data);
    return <View>
        <ScrollView>
            <Text style={[styles.tabTitle, {paddingTop: 20}]}>Прошедшие заплывы</Text>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" style={ {paddingVertical: 10} }/> :
                <FlatList
                    scrollEnabled={false}
                    data={data}
                    renderItem={({item}) =>
                        <TouchableNativeFeedback  style={{position: "relative"}} onPress={() => navigation.navigate('Result', {
                            "name": item.name,
                            'uri': item.uri
                        })}>
                            <View style={{backgroundColor: item.key % 2 ? '#fff' : '#e7eef9', padding: 20}}>
                                <Text style={styles.resName}>{item.name}</Text>
                                <Text style={styles.resDesc}>{item.desc}</Text>
                            </View>
                        </TouchableNativeFeedback >
                    }
                    keyExtractor={item => item.key}
                />}
        </ScrollView>

    </View>;
}

export default Results;