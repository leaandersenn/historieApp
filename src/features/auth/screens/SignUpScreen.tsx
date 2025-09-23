import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signUp, confirmSignUp, resendSignUpCode, signIn } from 'aws-amplify/auth';

export default function SignUpScreen() {
  const navigation = useNavigation<any>();

  const [mode, setMode] = useState<'FORM' | 'CONFIRM'>('FORM');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [focused, setFocused] = useState<'email' | 'password' | 'code' | null>(null);

  const handleSignUp = useCallback(async () => {
    setErr(null); setInfo(null);
    if (!email.trim() || !password) { setErr('Fyll inn e-post og passord.'); return; }
    setLoading(true);
    try {
      await signUp({
        username: email.trim(),
        password,
        options: { userAttributes: { email: email.trim() } },
      });
      setInfo('Vi har sendt en kode til e-posten din.');
      setMode('CONFIRM');
    } catch (e: any) {
      if (e?.name === 'UsernameExistsException') setErr('Bruker finnes allerede. Logg inn i stedet.');
      else setErr(e?.message ?? 'Registrering feilet.');
    } finally { setLoading(false); }
  }, [email, password]);

  const handleConfirm = useCallback(async () => {
    setErr(null); setInfo(null);
    if (!code.trim()) { setErr('Skriv inn bekreftelseskoden.'); return; }
    setLoading(true);
    try {
      await confirmSignUp({ username: email.trim(), confirmationCode: code.trim() });
      await signIn({ username: email.trim(), password });
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (e: any) {
      setErr(e?.message ?? 'Bekreftelse feilet.');
    } finally { setLoading(false); }
  }, [code, email, navigation]);

  const handleResend = useCallback(async () => {
    setErr(null); setInfo(null);
    if (!email.trim()) { setErr('Mangler e-post.'); return; }
    setLoading(true);
    try {
      await resendSignUpCode({ username: email.trim() });
      setInfo('Ny kode sendt.');
    } catch (e: any) {
      setErr(e?.message ?? 'Kunne ikke sende ny kode.');
    } finally { setLoading(false); }
  }, [email]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.page}>
        <Image
          source={require('../../../../assets/bottom_icons.png')}
          style={styles.bgLogo}
          resizeMode="contain"
          tintColor="#085731"
        />

        <View style={styles.content}>
          <View style={styles.centerContent}>
              <Image
                source={require('../../../../assets/LogoLarge.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <Text style={styles.slogan}>Are you not entertained?</Text>
            </View>

          <Text style={styles.title}>{mode === 'FORM' ? 'Opprett konto' : 'Bekreft e-post'}</Text>

          {mode === 'FORM' ? (
            <>
              <TextInput
                placeholder="E-post"
                placeholderTextColor='#085731'
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="username"
                autoComplete="email"
                keyboardAppearance="dark"
                style={[styles.input, focused === 'email' && styles.inputFocused]}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
              <TextInput
                placeholder="Passord"
                placeholderTextColor='#085731'
                secureTextEntry
                textContentType="newPassword"
                autoComplete="password-new"
                keyboardAppearance="dark"
                style={[styles.input, focused === 'password' && styles.inputFocused]}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
              />

              {err && <Text style={styles.error}>{err}</Text>}
              {info && <Text style={styles.info}>{info}</Text>}

              <TouchableOpacity style={styles.primaryBtn} onPress={handleSignUp} disabled={loading} activeOpacity={0.9}>
                {loading ? <ActivityIndicator /> : <Text style={styles.primaryText}>Registrer</Text>}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('LogIn')} style={{ marginTop: 18 }}>
                <Text style={styles.linkText}>Har du konto? Logg inn</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.sub}>Skriv inn koden vi sendte til {email}</Text>

              <TextInput
                placeholder="Kode"
                placeholderTextColor='#085731'
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                keyboardAppearance="dark"
                style={[styles.input, focused === 'code' && styles.inputFocused]}
                value={code}
                onChangeText={setCode}
                onFocus={() => setFocused('code')}
                onBlur={() => setFocused(null)}
              />

              {err && <Text style={styles.error}>{err}</Text>}
              {info && <Text style={styles.info}>{info}</Text>}

              <TouchableOpacity style={styles.primaryBtn} onPress={handleConfirm} disabled={loading} activeOpacity={0.9}>
                {loading ? <ActivityIndicator /> : <Text style={styles.primaryText}>Bekreft</Text>}
              </TouchableOpacity>

              <TouchableOpacity onPress={handleResend} style={{ marginTop: 18 }}>
                <Text style={styles.linkText}>Send koden på nytt</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const GREEN = '#085731';

const IOS_FOCUS_SHADOW = {
  shadowColor: '#FFFFFF',
  shadowOpacity: 0.25,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 6 },
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'rgba(8, 87, 49, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgLogo: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    opacity: 0.12,
    top: '10%',
    left: '-10%',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 28,
    width: '100%',
    maxWidth: 360,
  },
  logo: {
    width: 180,
    height: 120,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#085731',
    marginBottom: 12,
    textAlign: 'center',
  },
  sub: {
    color: '#E6F5EC',
    textAlign: 'center',
    marginBottom: 8,
  },
  centerContent: {
    alignItems: 'center',
    marginBottom: 30
  },
    logoImage: {
    width: 300,
    height: 110,
    marginBottom: -15,
    resizeMode: 'contain' 
  },
  slogan: {
    fontSize: 14,
    fontWeight: '300',
    fontStyle: 'italic',
    color: '#085731',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.54)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#085731',
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.85)',
  },
  inputFocused: {
    borderColor: '#085731',
    backgroundColor: 'rgba(255,255,255,0.50)',
    ...(Platform.OS === 'ios' ? IOS_FOCUS_SHADOW : null), 
  },
  primaryBtn: {
    width: 220,
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryText: {
    color: '#085731',
    fontWeight: '700',
    fontSize: 16,
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 14,
  },
  error: {
    color: '#FFD2D2',
    backgroundColor: 'rgba(231,80,80,0.25)',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    textAlign: 'center',
    width: '100%',
  },
  info: {
    color: '#D1FAE5',
    textAlign: 'center',
    marginBottom: 8,
  },
});
