import React, {useState} from "react";
import HTMLParser from "fast-html-parser";
import {
    ActivityIndicator, Dimensions,
    Image, Linking,
    ScrollView,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";




const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

function Swim ({ route, navigation }) {
    const { name } = route.params;
    const { uri } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({});
    let request = new XMLHttpRequest();
    request.onreadystatechange = e => {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status === 200) {
            let HTMLParser = require('fast-html-parser');
            let root = HTMLParser.parse(request.responseText);
            let itms = root.querySelectorAll(".b_under_itms .itm");
            // console.log(elems);
            let swimProps = []
            for (let i = 0; i < itms.length; i++) {
                let cn = itms[i]["childNodes"];
                let s = '';
                for (let childnode of cn) {
                    s += childnode["rawText"] + "\n"
                }
                s = s.replace("\n\n", "\n")
                swimProps.push([s, i])
            }
            // console.log(swimProps);
            data["swimProps"] = swimProps;
            // console.log(data["swimProps"][0][0])
            let chcols = root.querySelectorAll(".challenge-dsc .column");
            let challengeText = '';
            for (let col of chcols) {
                for (let node of col["childNodes"])
                    challengeText += node["rawText"].trim() + '\n'
            }
            data["challengeText"] = challengeText
            // console.log(challengeText);
            data["distances"] = []
            let distances = root.querySelectorAll(".dist_tab-title label")
            for (let i = 0; i < distances.length; i++) {
                if (!distances[i].querySelector(".tab_last-slot")) {
                    data["distances"][i] = {
                        'key': i,
                        'name': distances[i].querySelector(".tab_title-dist")["childNodes"][0]["rawText"],
                        // 'distance': distances[i].querySelector(".tab_dsc-dist")["childNodes"][0]["rawText"],
                        'slots': "Слоты кончились"
                    }
                    continue
                }
                data["distances"][i] = {
                    'key': i,
                    'name': distances[i].querySelector(".tab_title-dist")["childNodes"][0]["rawText"],
                    // 'distance': distances[i].querySelector(".tab_dsc-dist")["childNodes"][0]["rawText"],
                    'slots': distances[i].querySelector(".tab_last-slot")["childNodes"][0]["rawText"].replace(/\s+/g, ' ').trim()
                }
            }
        } else {
            console.warn('error');
        }
        setLoading(false)
    };
    request.open('GET', uri);
    request.send();
    return  <View style={styles.swimScreen}>
        <Image source={require('./assets/swim_bg.png')} style={[{width: deviceWidth, height: deviceHeight + 150, position: "absolute", objectPosition: "center", objectFit: "cover"}]}/>
        <TouchableOpacity onPress={() => navigation.navigate("Tabs")} style={ styles.backButton }>
            <Ionicons name="chevron-back-circle-outline" size={25} color={"#fff"}/>
            <Text style={{fontSize: 16, paddingLeft: 5, color: "#fff"}}>Все старты</Text>
        </TouchableOpacity>
        <View>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" style={ {paddingVertical: 10} }/> :
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.swimName}>{name}</Text>
                    <View style={ styles.swimProps }>{data["swimProps"].map((item) => (
                        <Text key={item[1]} style={styles.swimPropText}>{item[0]}</Text>
                    ))}</View>
                    <Text style={{color: "#fff", paddingHorizontal: 20}}>{data.challengeText}</Text>
                    {data["distances"].length ? <Text style={styles.swimName}>РЕГИСТРАЦИЯ</Text> : <Text style={styles.swimName}>Заплыв отменён</Text>}

                    <View style={ styles.distances }>{data["distances"].map((item) => (
                        <TouchableNativeFeedback key={item["key"]} onPress={()=> Linking.openURL(uri)}>
                            <View style={styles.distance}>
                                <Text style={styles.distanceName}>{item["name"]}</Text>
                                <Text style={styles.distanceSlots}>{item["slots"]}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    ))}</View>

                </ScrollView>
            }

        </View>

    </View>;
}

export default Swim;