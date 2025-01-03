import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@/constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token'); 
      const response = await axios.get(`${BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfileData({
        name: response.data.user.name || '',
        email: response.data.user.email || '',
        password: '', // Do not fetch password for security reasons
      });
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to fetch profile.');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setUpdating(true);
      const token = await AsyncStorage.getItem('token');
      const updatePayload = { name: profileData.name, email: profileData.email };
      if (profileData.password.trim()) {
        updatePayload.password = profileData.password;
      }

      const response = await axios.put(
        `${BASE_URL}/user/profile`,
        updatePayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Success', response.data?.message || 'Profile updated successfully.');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={profileData.name}
            onChangeText={(text) => setProfileData({ ...profileData, name: text })}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={profileData.email}
            onChangeText={(text) => setProfileData({ ...profileData, email: text })}
          />

          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            value={profileData.password}
            onChangeText={(text) => setProfileData({ ...profileData, password: text })}
            placeholder="Leave blank to keep the current password"
            secureTextEntry
          />

          <Button
            title="Update Profile"
            onPress={updateProfile}
            disabled={updating} // Disable button while updating
          />

          {updating && <ActivityIndicator size="small" color="#0000ff" />}
        </>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});
