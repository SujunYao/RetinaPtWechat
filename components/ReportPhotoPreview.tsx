import React, { useState, useMemo } from 'react';
import {
  TouchableWithoutFeedback, Text, View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import I18n from '../i18n/i18n';
import styles from '../constants/Report';

function ReportPhotoPreview({
  onClose, photoData: { photoList, selectedPhoto },
}: {
  onClose: () => void,
  photoData: {
    photoList: Record<string, any>[],
    selectedPhoto: Record<string, string>,
  },
}) {
  const initialPhotoIndex = useMemo(() => (
    photoList.findIndex(p => p.tag === selectedPhoto.tag)
  ), [photoList, selectedPhoto]);
  const totalPhotoNumber = photoList.length;
  const [currentPhoto, setCurrentPhoto] = useState(initialPhotoIndex);

  const viewerPhotoList = useMemo(() => photoList.map(p => ({ url: p.imageLink })), [photoList]);
  const totalIndicator = useMemo(() => (
    `${currentPhoto + 1}/${totalPhotoNumber}`
  ), [totalPhotoNumber, currentPhoto]);

  const handleChangePhoto = (index?: number) => setCurrentPhoto(index!);
  const renderHeaderIndicator = (index?: number) => (
    <View style={styles.photoPreviewHeaderIndicator}>
      <Text style={styles.photoPreviewHeaderIndicatorText}>{photoList[index! - 1].tag}</Text>
    </View>
  );

  return (
    <TouchableWithoutFeedback>
      <View style={styles.photoPreviewContainer}>
        <View style={styles.photoPreview}>
          <ImageViewer
            imageUrls={viewerPhotoList}
            index={initialPhotoIndex}
            saveToLocalByLongPress={false}
            onChange={handleChangePhoto}
            renderIndicator={renderHeaderIndicator}
          />
        </View>
        <View style={styles.photoPreviewFooter}>
          <Text style={styles.photoPreviewTotalIndicator}>{totalIndicator}</Text>
          <TouchableWithoutFeedback onPress={onClose}>
            <Text style={styles.photoPreviewClose}>{I18n.t('report-btn-close')}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ReportPhotoPreview;
