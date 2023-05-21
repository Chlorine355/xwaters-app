import React, {useState} from "react";
import {Dimensions, Image, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {WebView} from "react-native-webview";
import styles from "./styles";


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;



function Result( {route, navigation} ) {
    const { name } = route.params;
    const { uri } = route.params;
    const [WVStyle, setWVStyle] = useState(0);
    try {
        return (<View style={styles.swimScreen}>
            <Image source={require('./assets/swim_bg.png')} style={[{width: deviceWidth, height: deviceHeight + 150, position: "absolute", objectFit: "cover"}]}/>
            <TouchableOpacity onPress={() => navigation.navigate("Tabs")} style={ styles.backButton }>
                <Ionicons name="chevron-back-circle-outline" size={25} color={"#fff"}/>
                <Text style={{fontSize: 16, paddingLeft: 5, color: "#fff"}}>Все результаты</Text>
            </TouchableOpacity>
            {/*<Text>Результатик {name}</Text>
    <Text>{uri}</Text>*/}
            <View style={{width: deviceWidth, height: deviceHeight}}>
                <WebView
                    originWhitelist={['*']}
                    source={ { uri: uri } }
                    style={ WVStyle ? {opacity: 1, backgroundColor: "transparent"} : {opacity: 0}}
                    onLoadEnd={() => {setWVStyle(1)}}
                    // javaScriptEnabledAndroid={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    allowFileAccess={true}
                    allowFileAccessFromFileURLs={true}
                    allowUniversalAccessFromFileURLs={true}
                    mixedContentMode={'always'}
                    renderLoading={() => <Text style={styles.titleText}>Загрузка...</Text>}
                    injectedJavaScriptBeforeContentLoaded={
                        `
            document.addEventListener("DOMContentLoaded", (event) => {
            document.querySelector(".procent-preloader").style.display = 'none';
            let el = document.querySelectorAll(".user-event");
            if (el.length == 0) {
              let nodata = document.createElement('div');
              nodata.textContent = "no data";
              document.body.appendChild(nodata);
              let newStyle = document.createElement('style');
              newStyle.textContent = '*:not(html, body, body > div:last-child) {display: none}';
              document.head.appendChild(newStyle);
            } else {
            el = el[0];
            document.body.appendChild(el);
            let newStyle = document.createElement('style');
            newStyle.textContent = '*:not(html, body, .user-event, .user-event *) {display: none} .user-event > div:not(.band:first-child) {pointer-events: none} .user-event {padding-bottom: 100px!important;} *:not(label, input) {color: white!important} td::before {color: white!important} .band_full {display: none!important} p.user-event__title_blue {color: white!important} .loader {background: transparent!important}';
            document.head.appendChild(newStyle); }
            })
            `
                    }
                />
            </View>
        </View>)
    }
    catch (e) {
        console.log(e);
    }
}

export default Result;