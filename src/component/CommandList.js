import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SyntaxHighlighter from 'react-native-syntax-highlighter';
import {tomorrow} from 'react-syntax-highlighter/styles/hljs';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ListItem = (props) => {
  const {title, description, syntax, index, setInputValue, refRBSheet} = props;
  const [currentIndex, setCurrentIndex] = useState(null);
  const onItemPress = (index) => {
    setCurrentIndex(index === currentIndex ? null : index);
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        150,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity,
      ),
    );
  };

  const onSyntaxPress = (syntax) => {
    setInputValue(syntax);
    refRBSheet.current.close();
  };
  return (
    <TouchableWithoutFeedback onPress={() => onItemPress(index)}>
      <View style={styles.item}>
        <View styles={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Icon name="arrow-drop-down" size={36} style={styles.dropDownIcon} />
        </View>

        <Text style={styles.description}>{description}</Text>
        <TouchableHighlight
          style={styles.codeSyntaxContainer}
          onPress={() => onSyntaxPress(syntax)}>
          <View>
            {index === currentIndex && (
              <SyntaxHighlighter
                fontSize={14}
                language="sql"
                wrapLines={true}
                // style={tomorrow}
                wrapLines={true}
                highlighter="hljs">
                {syntax}
              </SyntaxHighlighter>
            )}
          </View>
        </TouchableHighlight>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function CommandList({listData, setInputValue, refRBSheet}) {
  return (
    <FlatList
      data={listData}
      bounces={false}
      maxToRenderPerBatch={3}
      renderItem={({item, index}) => (
        <ListItem
          {...item}
          index={index}
          listData={listData}
          setInputValue={setInputValue}
          refRBSheet={refRBSheet}
        />
      )}
      initialNumToRender={2}
      windowSize={5}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: '100%',
  },
  item: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 2,
  },
  header: {
    position: 'relative',
  },
  dropDownIcon: {
    position: 'absolute',
    right: 5,
    top: -5,
  },
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 16,
  },

  codeSyntaxContainer: {
    marginTop: 10,
  },
});
