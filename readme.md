```
android\variables.gradle
minSdkVersion = 23
```
```
AndroidManifest.xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
```

[res generator](https://github.com/ionic-team/cordova-res)
```
cordova-res android --skip-config --copy
```