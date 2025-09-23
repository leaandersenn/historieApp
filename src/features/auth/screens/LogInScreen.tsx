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
import { signIn, confirmSignIn, fetchAuthSession } from 'aws-amplify/auth';

export default function LogInScreen() {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState<'SIGN_IN' | 'NEW_PASSWORD_REQUIRED'>('SIGN_IN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [focused, setFocused] = useState<'email' | 'password' | 'newpw' | null>(null);

  const proceedHome = useCallback(async () => {
    const s = await fetchAuthSession();
    if (!s.tokens?.accessToken) throw new Error('Ingen sesjon');
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  }, [navigation]);

  const doSignIn = useCallback(async () => {
    setErr(null);
    if (!email.trim() || !password) { setErr('Skriv inn e-post og passord.'); return; }
    setLoading(true);
    try {
      const { nextStep } = await signIn({ username: email.trim(), password });
      if (nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') setStep('NEW_PASSWORD_REQUIRED');
      else await proceedHome();
      console.log("Sign in completed");
    } catch (e: any) { 
      console.log("Login error dump:", JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
      setErr(e?.message ?? 'Innlogging feilet');
    }

    finally { setLoading(false); }
  }, [email, password, proceedHome]);

  const confirmNewPw = useCallback(async () => {
    setErr(null);
    if (!newPassword) { setErr('Skriv inn nytt passord.'); return; }
    setLoading(true);
    try { await confirmSignIn({ challengeResponse: newPassword }); await proceedHome(); }
    catch (e: any) { setErr(e?.message ?? 'Feil ved nytt passord.'); }
    finally { setLoading(false); }
  }, [newPassword, proceedHome]);

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

          {step === 'SIGN_IN' ? (
            <>
              <TextInput
                placeholder="E-post"
                placeholderTextColor="#085731"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="username"
                autoComplete="email"
                keyboardAppearance="dark"
                style={[
                  styles.input,
                  focused === 'email' && styles.inputFocused,
                ]}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
              <TextInput
                placeholder="Passord"
                placeholderTextColor="#085731"
                secureTextEntry
                textContentType="password"
                autoComplete="password"
                keyboardAppearance="dark"
                style={[
                  styles.input,
                  focused === 'password' && styles.inputFocused,
                ]}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
              />

              {err && <Text style={styles.error}>{err}</Text>}

              <TouchableOpacity style={styles.primaryBtn} onPress={doSignIn} disabled={loading} activeOpacity={0.9}>
                {loading ? <ActivityIndicator /> : <Text style={styles.primaryText}>Logg inn</Text>}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 18 }}>
                <Text style={styles.linkText}>Har du ikke konto? Opprett bruker</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                placeholder="Nytt passord"
                placeholderTextColor="#085731"
                secureTextEntry
                textContentType="newPassword"
                keyboardAppearance="dark"
                style={[
                  styles.input,
                  focused === 'newpw' && styles.inputFocused,
                ]}
                value={newPassword}
                onChangeText={setNewPassword}
                onFocus={() => setFocused('newpw')}
                onBlur={() => setFocused(null)}
              />
              {err && <Text style={styles.error}>{err}</Text>}
              <TouchableOpacity style={styles.primaryBtn} onPress={confirmNewPw} disabled={loading} activeOpacity={0.9}>
                {loading ? <ActivityIndicator /> : <Text style={styles.primaryText}>Sett passord</Text>}
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const IOS_FOCUS_SHADOW = {
  shadowColor: '#085731',
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
   centerContent: {
    alignItems: 'center',
    marginBottom: 30
  },
});
