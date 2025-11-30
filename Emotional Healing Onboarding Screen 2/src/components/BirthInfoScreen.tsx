import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Calendar, Clock, MapPin, Shield } from 'lucide-react';
import type { Screen } from '../App';

interface BirthInfoScreenProps {
  onNavigate: (screen: Screen) => void;
  onBirthInfoComplete?: () => void;
}

const timeOptions = [
  '子时 (23:00-01:00)', '丑时 (01:00-03:00)', '寅时 (03:00-05:00)', 
  '卯时 (05:00-07:00)', '辰时 (07:00-09:00)', '巳时 (09:00-11:00)',
  '午时 (11:00-13:00)', '未时 (13:00-15:00)', '申时 (15:00-17:00)',
  '酉时 (17:00-19:00)', '戌时 (19:00-21:00)', '亥时 (21:00-23:00)',
  '不清楚'
];

const locationOptions = [
  { province: '北京市', cities: ['东城区', '西城区', '朝阳区', '海淀区', '丰台区', '石景山区', '通州区', '昌平区'] },
  { province: '上海市', cities: ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '浦东新区'] },
  { province: '天津市', cities: ['和平区', '河东区', '河西区', '南开区', '河北区', '红桥区'] },
  { province: '重庆市', cities: ['渝中区', '江北区', '南岸区', '九龙坡区', '沙坪坝区', '渝北区'] },
  { province: '广东省', cities: ['广州市', '深圳市', '珠海市', '佛山市', '东莞市', '中山市', '惠州市', '江门市', '湛江市', '汕头市'] },
  { province: '江苏省', cities: ['南京市', '苏州市', '无锡市', '常州市', '南通市', '扬州市', '镇江市', '徐州市', '盐城市', '淮安市'] },
  { province: '浙江省', cities: ['杭州市', '宁波市', '温州市', '绍兴市', '嘉兴市', '湖州市', '金华市', '台州市', '丽水市', '衢州市'] },
  { province: '山东省', cities: ['济南市', '青岛市', '烟台市', '潍坊市', '临沂市', '济宁市', '淄博市', '威海市'] },
  { province: '河南省', cities: ['郑州市', '洛阳市', '开封市', '南阳市', '新乡市', '安阳市', '焦作市', '许昌市'] },
  { province: '四川省', cities: ['成都市', '绵阳市', '德阳市', '南充市', '宜宾市', '自贡市', '乐山市', '泸州市'] },
  { province: '湖北省', cities: ['武汉市', '襄阳市', '宜昌市', '黄石市', '荆州市', '十堰市', '孝感市', '黄冈市'] },
  { province: '湖南省', cities: ['长沙市', '株洲市', '湘潭市', '衡阳市', '岳阳市', '常德市', '张家界市', '益阳市'] },
  { province: '河北省', cities: ['石家庄市', '唐山市', '秦皇岛市', '邯郸市', '保定市', '张家口市', '承德市', '廊坊市'] },
  { province: '福建省', cities: ['福州市', '厦门市', '泉州市', '漳州市', '莆田市', '三明市', '南平市', '龙岩市'] },
  { province: '安徽省', cities: ['合肥市', '芜湖市', '蚌埠市', '淮南市', '马鞍山市', '淮北市', '铜陵市', '安庆市'] },
  { province: '陕西省', cities: ['西安市', '宝鸡市', '咸阳市', '渭南市', '汉中市', '榆林市', '延安市', '商洛市'] },
  { province: '辽宁省', cities: ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市'] },
  { province: '江西省', cities: ['南昌市', '九江市', '赣州市', '吉安市', '宜春市', '上饶市', '抚州市', '景德镇市'] },
  { province: '云南省', cities: ['昆明市', '曲靖市', '玉溪市', '昭通市', '保山市', '丽江市', '普洱市', '临沧市'] },
  { province: '广西壮族自治区', cities: ['南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市'] },
  { province: '山西省', cities: ['太原市', '大同市', '阳泉市', '长治市', '晋城市', '朔州市', '晋中市', '运城市'] },
  { province: '吉林省', cities: ['长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市'] },
  { province: '黑龙江省', cities: ['哈尔滨市', '齐齐哈尔市', '鸡西市', '鹤岗市', '双鸭山市', '大庆市', '伊春市', '佳木斯市'] },
  { province: '贵州省', cities: ['贵阳市', '六盘水市', '遵义市', '安顺市', '毕节市', '铜仁市'] },
  { province: '甘肃省', cities: ['兰州市', '嘉峪关市', '金昌市', '白银市', '天水市', '武威市', '张掖市', '平凉市'] },
  { province: '海南省', cities: ['海口市', '三亚市', '三沙市', '儋州市'] },
  { province: '内蒙古自治区', cities: ['呼和浩特市', '包头市', '乌海市', '赤峰市', '通辽市', '鄂尔多斯市', '呼伦贝尔市', '巴彦淖尔市'] },
  { province: '新疆维吾尔自治区', cities: ['乌鲁木齐市', '克拉玛依市', '吐鲁番市', '哈密市'] },
  { province: '宁夏回族自治区', cities: ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市'] },
  { province: '青海省', cities: ['西宁市', '海东市'] },
  { province: '西藏自治区', cities: ['拉萨市', '日喀则市', '昌都市', '林芝市', '山南市', '那曲市'] },
  { province: '香港特别行政区', cities: ['香港岛', '九龙', '新界'] },
  { province: '澳门特别行政区', cities: ['澳门半岛', '氹仔', '路环'] },
  { province: '台湾省', cities: ['台北市', '高雄市', '台中市', '台南市', '新北市', '桃园市'] }
];

// 生成完整的地址选项列表
const allLocations: string[] = [];
locationOptions.forEach(({ province, cities }) => {
  cities.forEach(city => {
    allLocations.push(`${province} - ${city}`);
  });
});

export default function BirthInfoScreen({ onNavigate, onBirthInfoComplete }: BirthInfoScreenProps) {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [calendarType, setCalendarType] = useState<'solar' | 'lunar'>('solar');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [tempProvince, setTempProvince] = useState('');
  const [tempCity, setTempCity] = useState('');

  const handleSubmit = () => {
    // Mark user as returning user after completing birth info
    if (onBirthInfoComplete) {
      onBirthInfoComplete();
    }
    onNavigate('calculating');
  };

  const handleLocationClick = () => {
    setTempProvince(province);
    setTempCity(city);
    setShowLocationPicker(true);
  };

  const handleLocationConfirm = () => {
    if (tempProvince && tempCity) {
      setProvince(tempProvince);
      setCity(tempCity);
      setShowLocationPicker(false);
    }
  };

  const handleLocationCancel = () => {
    setShowLocationPicker(false);
  };

  const handleProvinceSelect = (prov: string) => {
    setTempProvince(prov);
    setTempCity(''); // Reset city when province changes
  };

  return (
    <div className="min-h-screen px-6 pt-6 pb-8 relative z-10">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button 
            onClick={() => onNavigate('emotionSource')}
            className="mb-6 text-white/50 hover:text-white/80 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="text-left">
            <h1 className="text-white/95 mb-2 leading-snug text-[28px]">
              让我用五行，<br />看看今天的情绪密码
            </h1>
            <p className="text-white/40 leading-relaxed text-[14px]">
              只需要一些信息，就能算你今日的宇宙五行能量
            </p>
          </div>
        </motion.div>

        {/* Input Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-6"
        >
          {/* Calendar Type Toggle */}
          <div className="flex gap-3 mb-2">
            <button
              onClick={() => setCalendarType('solar')}
              className={`
                flex-1 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 text-sm
                ${calendarType === 'solar'
                  ? 'bg-purple-500/20 border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                }
              `}
            >
              公历
            </button>
            <button
              onClick={() => setCalendarType('lunar')}
              className={`
                flex-1 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 text-sm
                ${calendarType === 'lunar'
                  ? 'bg-purple-500/20 border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                }
              `}
            >
              农历
            </button>
          </div>

          {/* Birth Date */}
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400">
              <Calendar className="w-5 h-5" />
            </div>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full pl-14 pr-5 py-5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-white/90 focus:bg-white/10 focus:border-purple-400/50 focus:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 outline-none [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              placeholder="yyyy-mm-dd"
            />
          </div>

          {/* Birth Time */}
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
            <select
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full pl-14 pr-5 py-5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-white/90 focus:bg-white/10 focus:border-purple-400/50 focus:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 outline-none appearance-none"
            >
              <option value="" className="bg-[#1a1a2e] text-white/80">请选择出生时辰</option>
              {timeOptions.map((time) => (
                <option key={time} value={time} className="bg-[#1a1a2e] text-white/80">
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Location Picker Trigger */}
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none z-10">
              <MapPin className="w-5 h-5" />
            </div>
            <button
              type="button"
              onClick={handleLocationClick}
              className="w-full pl-14 pr-5 py-5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-left focus:bg-white/10 focus:border-purple-400/50 focus:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 outline-none"
            >
              <span className={province && city ? 'text-white/90' : 'text-white/40'}>
                {province && city ? `${province} - ${city}` : '选择出生地址'}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Gender Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 mb-6"
        >
          <button
            onClick={() => setGender('male')}
            className={`
              flex-1 py-4 rounded-full backdrop-blur-xl border transition-all duration-300
              ${gender === 'male'
                ? 'bg-blue-500/20 border-blue-400/50 text-white shadow-[0_0_30px_rgba(59,130,246,0.5)]'
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
              }
            `}
          >
            男
          </button>
          <button
            onClick={() => setGender('female')}
            className={`
              flex-1 py-4 rounded-full backdrop-blur-xl border transition-all duration-300
              ${gender === 'female'
                ? 'bg-pink-500/20 border-pink-400/50 text-white shadow-[0_0_30px_rgba(236,72,153,0.5)]'
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
              }
            `}
          >
            女
          </button>
        </motion.div>

        {/* Privacy Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-white/30 text-xs mb-6"
        >
          <Shield className="w-4 h-4" />
          <span>我们会严格保护你的隐私信息</span>
        </motion.div>

        {/* Submit Button - Inline with content */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleSubmit}
          className="w-full py-5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_rgba(168,85,247,0.7)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          <span className="relative z-10 text-lg">开始测算</span>
        </motion.button>
      </div>

      {/* Location Picker Modal */}
      {showLocationPicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-full max-w-md bg-[#1a1a2e]/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl"
          >
            {/* Picker Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <button
                onClick={handleLocationCancel}
                className="text-white/50 hover:text-white/80 transition-colors"
              >
                取消
              </button>
              <h3 className="text-white/90">选择出生地址</h3>
              <button
                onClick={handleLocationConfirm}
                className="text-purple-400 hover:text-purple-300 transition-colors disabled:text-white/30"
                disabled={!tempProvince || !tempCity}
              >
                确定
              </button>
            </div>

            {/* Two Column Picker */}
            <div className="flex h-64">
              {/* Province Column */}
              <div className="flex-1 overflow-y-auto border-r border-white/10">
                {locationOptions.map(({ province: prov }) => (
                  <button
                    key={prov}
                    onClick={() => handleProvinceSelect(prov)}
                    className={`w-full px-4 py-3 text-left transition-colors ${
                      tempProvince === prov
                        ? 'bg-purple-500/20 text-white border-l-2 border-purple-400'
                        : 'text-white/60 hover:bg-white/5'
                    }`}
                  >
                    {prov}
                  </button>
                ))}
              </div>

              {/* City Column */}
              <div className="flex-1 overflow-y-auto">
                {tempProvince ? (
                  locationOptions
                    .find(loc => loc.province === tempProvince)
                    ?.cities.map((cityName) => (
                      <button
                        key={cityName}
                        onClick={() => setTempCity(cityName)}
                        className={`w-full px-4 py-3 text-left transition-colors ${
                          tempCity === cityName
                            ? 'bg-purple-500/20 text-white border-l-2 border-purple-400'
                            : 'text-white/60 hover:bg-white/5'
                        }`}
                      >
                        {cityName}
                      </button>
                    ))
                ) : (
                  <div className="flex items-center justify-center h-full text-white/30 text-sm">
                    请先选择省份
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
