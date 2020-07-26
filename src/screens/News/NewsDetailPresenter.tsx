import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {INews} from '../../Components/types/News';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

interface IProps {
  news: INews;
}

export default ({news}: IProps) => {
  const [webViewHeight, setWebViewHeight] = useState(100);

  const contentHtml = (content: string) =>
    `
      <html>
          <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
            }
          </style>
          </head>
          <body>
              ${content}
          </body>
      </html>`;

  const changeHtmlHeight = (e: WebViewMessageEvent) => {
    setWebViewHeight(Number(e.nativeEvent.data));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{news.title}</Text>
        </View>
        <View style={styles.detailWrapper}>
          {news.imgUrl && (
            <Image
              style={{resizeMode: 'contain', height: 300}}
              source={{
                uri: news.imgUrl,
              }}
            />
          )}
          <WebView
            source={{
              html: contentHtml(news.content),
            }}
            onMessage={changeHtmlHeight}
            injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
            style={[styles.detailContent, {height: webViewHeight}]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 15,
    padding: 10,
  },
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
  },
  title: {
    color: '#696969',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subTitle: {
    color: '#999999',
    fontSize: 14,
  },
  titleWrapper: {
    padding: 20,
  },
  detailWrapper: {
    borderTopWidth: 0.5,
    borderColor: '#d4d4d4',
    padding: 20,
  },
  detailContent: {
    marginTop: 10,
    color: '#757575',
    fontSize: 12,
  },
});
