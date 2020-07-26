import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IPayment} from '../../Components/types/Payment';

interface IProps {
  payments: Array<IPayment>;
}

export default ({payments}: IProps) => {
  const getDate = (date: string) => {
    const d = new Date(date);

    return [
      `${d.getFullYear()}년`,
      `${d.getMonth() + 1}월`,
      `${d.getDate()}일`,
    ].join(' ');
  };

  return (
    <View style={styles.container}>
      {payments.map((payment, idx) => (
        <View style={styles.paymentContainer} key={idx}>
          <View style={[styles.paymentWrapper, styles.paymentBottomWidth]}>
            <Image
              source={require('../../Assets/payDate.png')}
              style={styles.paymentImage}
            />
            <View style={styles.paymentTextWrapper}>
              <Text style={styles.paymentInfoText}>결제일</Text>
              <Text style={styles.paymentInfoText}>
                {getDate(payment.regDate)}
              </Text>
            </View>
          </View>
          <View style={[styles.paymentWrapper, styles.paymentBottomWidth]}>
            <Image
              source={require('../../Assets/payPlace.png')}
              style={styles.paymentImage}
            />
            <View style={styles.paymentTextWrapper}>
              <Text style={styles.paymentInfoText}>결제지점</Text>
              <Text style={styles.paymentInfoText}>{payment.storeName}</Text>
            </View>
          </View>
          <View style={[styles.paymentWrapper, styles.paymentBottomWidth]}>
            <Image
              source={require('../../Assets/payAmount.png')}
              style={styles.paymentImage}
            />
            <View style={styles.paymentTextWrapper}>
              <Text style={styles.paymentInfoText}>결제금액</Text>
              <Text style={styles.paymentInfoText}>{payment.payAmount}</Text>
            </View>
          </View>
          <View style={styles.paymentWrapper}>
            <Image
              source={require('../../Assets/payPackage.png')}
              style={styles.paymentImage}
            />

            <View style={styles.paymentTextWrapper}>
              <Text style={styles.paymentInfoText}>패키지 정보</Text>
              <Text style={styles.paymentInfoText}>{payment.packageName}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  paymentContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 10,
  },
  paymentWrapper: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  paymentBottomWidth: {
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 0.5,
  },
  paymentTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentImage: {
    width: 15,
    height: 15,
    marginRight: 15,
  },
  paymentInfoText: {
    color: '#aaaaaa',
    fontSize: 12,
  },
});
