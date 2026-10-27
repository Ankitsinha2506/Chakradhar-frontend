import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import Header from '../Navigations/Header';
import FramedImage from '../ui/FramedImage';
import { Reveal } from '../ui/Motion';
import { colors, useLayout } from '../ui/theme';

export default function SwamiInfoPage() {
  const { wide, padding } = useLayout();
  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <Header title="जीवनचरित्र" back />
      <ScrollView style={styles.scroll} contentContainerStyle={[styles.container, { paddingHorizontal: padding }]}>
        <Reveal>
          <View style={[styles.hero, { flexDirection: wide ? 'row' : 'column', padding: wide ? 28 : 20 }]}>
            <View style={styles.portrait}>
              <FramedImage source={require('../assets/chakradhar2.jpg')} height={220} />
            </View>
            <View style={styles.introduction}>
              <Text style={styles.eyebrow}>जीवन आणि विचार</Text>
              <Text accessibilityRole="header" style={[styles.title, { fontSize: wide ? 30 : 25 }]}>श्री चक्रधर स्वामी:{'\n'}आध्यात्मिक जीवनचरित्र</Text>
              <Text style={styles.subtitle}>सत्य, भक्ती आणि समतेचा मार्ग</Text>
            </View>
          </View>
        </Reveal>
        <View style={[styles.article, { padding: wide ? 32 : 20 }]}>
        <Text accessibilityRole="header" style={styles.heading}>१. जन्म आणि बालपण</Text>
        <Text style={styles.text}>
          श्री चक्रधर स्वामी यांचा जन्म गुजरातमध्ये झाला. त्यांच्या बालपणातील अनेक चमत्कारिक घटना सांगितल्या जातात. लहानपणापासूनच त्यांच्यात आध्यात्मिक प्रवृत्ती दिसू लागली होती.
        </Text>

        <Text accessibilityRole="header" style={styles.heading}>२. संन्यास आणि भ्रमंती</Text>
        <Text style={styles.text}>
          तरुणावस्थेत त्यांनी संन्यास स्वीकारला आणि भारतभर भ्रमंती करून लोकांना आध्यात्मिक शिकवण दिली. त्यांनी अनेक ठिकाणी जाऊन लोकांना सत्य, प्रेम आणि समतेचा संदेश दिला.
        </Text>

        <Text accessibilityRole="header" style={styles.heading}>३. महानुभाव पंथाची स्थापना</Text>
        <Text style={styles.text}>
          श्री चक्रधर स्वामींनी महानुभाव पंथाची स्थापना केली. हा पंथ कृष्णभक्तीवर आधारित आहे आणि जातिभेद, लिंगभेद नाकारतो. त्यांच्या शिकवणीत साधे आणि नैतिक जीवन, सामाजिक समता, आणि भक्ती यावर भर होता.
        </Text>

        <Text accessibilityRole="header" style={styles.heading}>श्री चक्रधर स्वामींचे तत्त्वज्ञान</Text>
        <Text accessibilityRole="header" style={styles.subHeading}>१. एकेश्वरवाद</Text>
        <Text style={styles.text}>
          श्री चक्रधर स्वामींच्या मते, कृष्ण हेच एकमेव देव आहेत. त्यांनी इतर देवतांच्या उपासनेला विरोध केला.
        </Text>

        <Text accessibilityRole="header" style={styles.subHeading}>२. सामाजिक समता</Text>
        <Text style={styles.text}>
          त्यांनी जातिभेद आणि लिंगभेद नाकारला आणि सर्व मानवांना समान मानले. त्यांच्या पंथात सर्व जाती आणि वर्गांचे लोक सहभागी होऊ शकतात.
        </Text>

        <Text accessibilityRole="header" style={styles.subHeading}>३. साधे आणि नैतिक जीवन</Text>
        <Text style={styles.text}>
          त्यांनी साधे आणि नैतिक जीवन जगण्यावर भर दिला. भौतिक सुखांपेक्षा आध्यात्मिक सुखाला महत्त्व दिले.
        </Text>

        <Text accessibilityRole="header" style={styles.subHeading}>४. भक्तीमार्ग</Text>
        <Text style={styles.text}>
          त्यांच्या मते, भक्ती हा ईश्वरापर्यंत पोहोचण्याचा सर्वात सोपा मार्ग आहे.
        </Text>

        <Text accessibilityRole="header" style={styles.heading}>श्री चक्रधर स्वामींचे चमत्कार</Text>
        <Text style={styles.text}>
          श्री चक्रधर स्वामींनी अनेक चमत्कार केले, ज्यामुळे लोक त्यांच्यावर श्रद्धा ठेवू लागले. काही प्रमुख चमत्कार खालीलप्रमाणे आहेत:
        </Text>
        <Text style={styles.text}>- रामेश्वर येथील चमत्कार: एका गरीब भक्ताच्या घरात पाण्याचा कलश निर्माण केला.</Text>
        <Text style={styles.text}>- दुष्काळात पाऊस आणणे: एका गावात दुष्काळ पडल्यावर त्यांनी पाऊस आणला.</Text>
        <Text style={styles.text}>- रोग बरे करणे: अनेक भक्तांचे रोग बरे केले.</Text>

        <Text accessibilityRole="header" style={styles.heading}>श्री चक्रधर स्वामींचे उपदेश</Text>
        <Text style={styles.text}>- सत्याचा मार्ग: सत्य बोलणे आणि सत्याचे आचरण करणे.</Text>
        <Text style={styles.text}>- प्रेम आणि करुणा: सर्व प्राणिमात्रांवर प्रेम आणि करुणा बाळगणे.</Text>
        <Text style={styles.text}>- समता: सर्व मानवांना समान मानणे.</Text>
        <Text style={styles.text}>- भक्ती: ईश्वरभक्ती हा जीवनाचा मुख्य उद्देश.</Text>

        <Text accessibilityRole="header" style={styles.heading}>श्री चक्रधर स्वामींचे साहित्य</Text>
        <Text style={styles.text}>
          श्री चक्रधर स्वामींच्या शिकवणी आणि जीवनाचा तपशील लीलाचरित्र या ग्रंथात म्हाईंबट्टा यांनी नोंदवला आहे. हे ग्रंथ महानुभाव पंथाचे प्रमुख ग्रंथांपैकी एक आहे.
        </Text>

        <Text accessibilityRole="header" style={styles.heading}>श्री चक्रधर स्वामींचे महत्त्व</Text>
        <Text style={styles.text}>
          त्यांनी समाजात समता आणि न्यायाचा संदेश पसरवला. त्यांच्या शिकवणीमुळे अनेक लोक आध्यात्मिक जीवनाकडे वळले. महानुभाव पंथाने मराठी साहित्य आणि संस्कृतीला मोठे योगदान दिले.
        </Text>

        <Text style={styles.text}>
          श्री चक्रधर स्वामींचे जीवन आणि शिकवणी हे आजही अनेक लोकांसाठी प्रेरणादायी आहे. त्यांच्या शिकवणींचा अभ्यास करून आपण आपल्या जीवनात सत्य, प्रेम, आणि समतेचा मार्ग अवलंबू शकतो.
        </Text>
        </View>
        <Text style={styles.footer}>श्री चक्रधर स्वामी • जीवन आणि शिकवण</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  container: { width: '100%', maxWidth: 960, alignSelf: 'center', paddingTop: 24, paddingBottom: 40 },
  hero: { backgroundColor: colors.soft, borderWidth: 1, borderColor: colors.border, borderRadius: 22, gap: 24, alignItems: 'center', marginBottom: 24 },
  portrait: { width: 180, borderRadius: 14, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', flexShrink: 0 },
  introduction: { flex: 1, minWidth: 0, alignSelf: 'stretch', justifyContent: 'center' },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },
  title: { color: colors.ink, fontWeight: '700', marginBottom: 14 },
  subtitle: { color: colors.muted, fontSize: 16, lineHeight: 27 },
  article: { backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border },
  heading: { fontSize: 22, fontWeight: '700', lineHeight: 34, color: colors.primary, marginTop: 20, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 12 },
  subHeading: { fontSize: 18, fontWeight: '700', color: colors.ink, lineHeight: 30, marginTop: 10, marginBottom: 8 },
  text: { fontSize: 17, lineHeight: 32, color: colors.ink, marginBottom: 18 },
  footer: { color: colors.muted, fontSize: 12, lineHeight: 22, textAlign: 'center', marginTop: 24 },
});
