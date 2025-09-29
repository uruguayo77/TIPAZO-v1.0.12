import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/auth-store';
import { ArrowLeft, Users, CreditCard, Settings } from 'lucide-react-native';
import { Card } from '@/components/Card';

export default function AdminPanel() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    if (user?.userType !== 'admin') {
      router.replace('/(tabs)');
    }
  }, [user, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.userType !== 'admin') return;
      
      setIsLoading(true);
      try {
        // TODO: Replace with real API call when backend is ready
        // const response = await fetch('https://tipazo.app/api/admin/users');
        // const data = await response.json();
        // setUsers(data);
        // For now, set empty array
        setUsers([]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleBack = () => {
    router.back();
  };

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Cargando datos...</Text>
        </View>
      );
    }

    switch (activeTab) {
      case 'users':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Usuarios registrados</Text>
            {users.length > 0 ? (
              users.map((user: any) => (
                <Card key={user.id} style={styles.userCard}>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                  </View>
                  <View style={styles.userActions}>
                    <View style={[
                      styles.subscriptionBadge,
                      user.subscription === 'active' ? styles.activeBadge : 
                      user.subscription === 'trial' ? styles.trialBadge : styles.expiredBadge
                    ]}>
                      <Text style={styles.subscriptionText}>
                        {user.subscription === 'active' ? 'Activo' : 
                         user.subscription === 'trial' ? 'Prueba' : 'Expirado'}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                      <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              ))
            ) : (
              <Text style={styles.noDataText}>No hay datos de usuarios disponibles.</Text>
            )}
          </View>
        );
      case 'subscriptions':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Gestión de suscripciones</Text>
            <Text style={styles.placeholderText}>
              Esta sección permitirá gestionar las suscripciones de los usuarios cuando el backend esté listo.
            </Text>
          </View>
        );
      case 'settings':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Configuración del sistema</Text>
            <Text style={styles.placeholderText}>
              Esta sección permitirá configurar parámetros del sistema cuando el backend esté listo.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Panel de Administración',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'users' && styles.activeTab]} 
          onPress={() => setActiveTab('users')}
        >
          <Users size={20} color={activeTab === 'users' ? colors.primary : colors.gray[600]} />
          <Text style={[styles.tabText, activeTab === 'users' && styles.activeTabText]}>Usuarios</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'subscriptions' && styles.activeTab]} 
          onPress={() => setActiveTab('subscriptions')}
        >
          <CreditCard size={20} color={activeTab === 'subscriptions' ? colors.primary : colors.gray[600]} />
          <Text style={[styles.tabText, activeTab === 'subscriptions' && styles.activeTabText]}>Suscripciones</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]} 
          onPress={() => setActiveTab('settings')}
        >
          <Settings size={20} color={activeTab === 'settings' ? colors.primary : colors.gray[600]} />
          <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>Configuración</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Panel de administración</Text>
          <Text style={styles.infoText}>
            Este panel se conectará a la API de administración cuando el backend esté listo.
          </Text>
        </View>
        
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerButton: {
    padding: 8,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[800],
    backgroundColor: colors.gray[900],
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    color: colors.gray[600],
    fontSize: 14,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoBox: {
    backgroundColor: colors.gray[800],
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray[400],
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.gray[400],
  },
  tabContent: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 14,
    color: colors.gray[400],
    lineHeight: 20,
    fontStyle: 'italic',
  },
  noDataText: {
    fontSize: 14,
    color: colors.gray[400],
    lineHeight: 20,
    textAlign: 'center',
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.gray[400],
  },
  userActions: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 8,
  },
  subscriptionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: 'rgba(0, 200, 83, 0.2)',
  },
  trialBadge: {
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
  },
  expiredBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  subscriptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.primary + '20',
    borderRadius: 4,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
});