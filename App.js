/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  Linking,
  LogBox,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import {WebView} from 'react-native-webview'




LogBox.ignoreAllLogs();//Ignore all log notifications



//import SourceSansProLight from './assets/fonts/SourceSansPro-Light.ttf';
//import SourceSansProRegular from './assets/fonts/SourceSansPro-Regular.ttf';
//import SourceSansProBold from './assets/fonts/SourceSansPro-Bold.ttf';

// import {re} from "@babel/core/lib/vendor/import-meta-resolve";
const deviceWidth = Dimensions.get("window").width
const deviceHeight = Dimensions.get("window").height


function detectURLs(message) {
  let urlRegex = /(((https?:\/\/)|(www\.))\S+)/g;
  return message.match(urlRegex)
}


const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}


const getCredentials = async () => {
  try {
    const e = await AsyncStorage.getItem("email");
    const p = await AsyncStorage.getItem("password");
    // console.log(u, p);
    return [e, p]
  } catch (err) {
    // saving error
  }
}


function Login ({ navigation }) {
    let blue = "#168AEF"
    /* const [loaded] = useFonts({
      SourceSansProLight,
      SourceSansProRegular,
      SourceSansProBold,
    });

    if (!loaded || !BackgroundImage) {
      return <Text>Loading...</Text>;
    } */


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authed, setAuthed] = useState(false);


    getCredentials().then((v) => {
      setEmail(v[0]);
      setPassword(v[1]);
      }
    )

    if (email && password && !authed) {
      console.log("authing with " + email + " " + password);

      let request = new XMLHttpRequest();
      request.onreadystatechange = e => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          console.log("ok");
          console.log(request.response)
          setAuthed(true);
        } else {
          console.warn(request.response, "lol");
        }
      }
      request.withCredentials = true;

      request.open('POST', 'https://x-waters.com/wp-admin/admin-ajax.php&action=ajaxlogin',);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.send();
    }


    return  (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <Image
                  style={{ flex: 1, width: null, marginTop: -500 }}
                  source={require('./assets/background-water.jpg')}
              />
            </View>
            <Animatable.Text
                style={styles.titleText}
                animation='fadeInDown'
                delay={300}
            >
              X-WATERS
            </Animatable.Text>
            <Animatable.Image animation='fadeInDown'
                              delay={300} source={require('./assets/champ-logo-white-cut.png')} style={[{width: 150, height: 150, position: "absolute", top: Dimensions.get('screen').height * 0.23,alignSelf: "center"}]}/>
            <Animatable.View style={styles.bottomView} animation='fadeInUp'
              delay={300}>
              {/*<Text style={styles.loginText}>Вход</Text>*/ }
              <View style={styles.inputView}>
                <Icon
                    style={styles.inputIcon}
                    name='person'
                    color='#168AEF'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Имя пользователя'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                />
              </View>
              <View style={styles.inputView}>
                <Icon
                    style={styles.inputIcon}
                    name='lock'
                    type='ionicons'
                    color='#168AEF'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Пароль'
                    secureTextEntry={true}
                    autoCapitalize='none'
                />
              </View>
              <Text style={styles.fpText}>Забыли пароль?</Text>
              <TouchableOpacity style={styles.loginButton} onPress={() => navigation.replace('Tabs')}>
                <Text style={styles.loginButtonText}>Войти</Text>
              </TouchableOpacity>
              <Text style={styles.registerText}>
                <Text style={{ color: "#168AEF",fontFamily: 'Roboto',
                  fontWeight: "bold", }}>
                  {' Зарегистрироваться'}
                </Text>
              </Text>
            </Animatable.View>
          </View>
        </TouchableWithoutFeedback>
    );}


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


function LK ({ navigation }) {
  return  <View style={styles.tab}>
    <Text>Личный кабинет</Text>

  </View>;
}

function More ({ navigation }) {
  const [switchVal, setSwitchVal] = useState(false);
  return  <View style={styles.tab}>


    <View style={ styles.switchRow }>
      <Text style={ {height: 20} }>Пуш-уведомления</Text>
      <Switch trackColor={ {false: '#767577', true: "#81b0ff"}}
              thumbColor={switchVal ? '#fff' : '#f4f3f4'}
              onValueChange={() => {setSwitchVal((prevVal) => !prevVal);
                                    Toast.show(switchVal ? 'Уведомления выключены' : 'Уведомления включены', Toast.SHORT);}}
              value={switchVal}
      ></Switch>
    </View>


  </View>;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab: {
    padding: 20,
  },
  swimScreen: {
    paddingTop: 50,
  },
  tabTitle: {
    paddingLeft: 20, paddingBottom: 20,
    fontSize: 30,
    color: "black",
    fontFamily: 'Roboto',
    fontWeight: "bold",
  },
  swims: {flexGrow: 1},
  datedesc: {
    position: "absolute",
    bottom: 20
  },
  swimListDate: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
    backgroundColor: '#742157',
    alignSelf: 'flex-start',
    color: "white",
    fontFamily: "Roboto"
  },
  swimListDesc: {
    // width: deviceWidth,
    fontSize: 13,
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
    color: "white",
    fontFamily: "Roboto",
    fontWeight: 'bold',
    backgroundColor: '#000d54'
  },
  swimListName: {
    position: "absolute",
    textAlign: 'right',
    width: 300,
    top: 20,
    right: 20,
    fontSize: 30,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "white",
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10
  },
  swimListType: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
    backgroundColor: '#0d99d5',

    alignSelf: 'flex-start',
    color: "white",
    fontFamily: "Roboto"
  },
  swimTypes: {
    display: "flex",
    flexDirection: 'row'
  },

  swimName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    paddingTop: 10,
    paddingHorizontal: 20,
    textAlign: "center"
  },
  swimProps: {
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  swimPropText: {
    fontSize: 20,
    paddingTop: 10,
    width: deviceWidth,
    paddingHorizontal: 25,
    // backgroundColor: '#0d99d5',
    color: "#fff",
    backgroundColor: '#0d99d540',
    textAlignVertical: 'center',
    textAlign: "center"
  },


  titleText: {
    position: 'absolute',
    top: deviceHeight * 0.13,
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: "bold",
    fontSize: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  bottomView: {
    backgroundColor: '#fff',
    opacity: 0.95,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  loginText: {
    fontFamily: 'Roboto',
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
  },
  inputView: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f3f6',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#168AEF',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: "bold",
    alignSelf: 'center',
    fontSize: 18,
  },
  registerText: {
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12,
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  fpText: {
    marginTop: 10,
    alignSelf: 'flex-end',
    fontFamily: 'Roboto',
    fontWeight: "bold",
    fontSize: 16,
    color: '#168AEF',
  },
  switchRow: {flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingTop: 20},
  resName: {
    fontSize: 24,
    color: '#001380',
    fontWeight: "bold"
  },
  resDesc: {},
  backButton: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingLeft: 20
  },
  challengeText: {marginHorizontal: 30},
  distances: {paddingBottom: '50%',
    paddingTop: 30,
  },
  distance: {
    marginTop: 5,
    width: deviceWidth,
    height: 100,
    backgroundColor: '#00138050',
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  distanceName: {
    color:"#fff",
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold"
  },
  distanceSlots: {
    color:"#fff"
  }
})



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
      <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Главная') {
                iconName = focused
                    ? 'home'
                    : 'home-outline';
              } else if (route.name === 'Результаты') {
                iconName = focused ? 'podium' : 'podium-outline';
              } else if (route.name === 'Личный кабинет') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              } else if (route.name === 'Ещё') {
                iconName = focused ? 'apps' : 'apps-outline';
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} type={"ionicon"} />;
            }})}>
        <Tab.Screen name="Главная" component={Home} />
        <Tab.Screen name="Результаты" component={Results} />
        <Tab.Screen name="Личный кабинет" component={LK} />
        <Tab.Screen name="Ещё" component={More} />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Tabs" component={Tabs}/>
        <Stack.Screen name="Swim" component={Swim}/>
        <Stack.Screen name="Result" component={Result}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
  }

