<template>
  <div class="container">
    <Loading v-if="!ready">Loading...</Loading>
    <Container v-else :options="{ width: 3840, height: 2160 }">
      <div class="header">
        <TopHeader />
      </div>
      <div class="separator-wrapper">
        <Separator />
      </div>
      <div class="center">
        <div class="left">
          <div class="left1">
            <TotalUser
              :today-user="userData.userToday"
              :growth-last-day="+userData.userGrowthLastDay || 0"
              :growth-last-month="+userData.userGrowthLastMonth || 0"
              ref="totalUser"
            ></TotalUser>
          </div>
          <div class="left2">
            <AverageAge
              :data="ageData"
              :avg-age="+userData.averageAge || 0"
              ref="averageAge"
            ></AverageAge>
          </div>
          <div class="left3">
            <TotalDevice :data="deviceData"></TotalDevice>
          </div>
          <div class="left4">
            <TotalGender :data="userData.gender"></TotalGender>
          </div>
          <div class="left5">
            <LineChart :data="userData.rider"></LineChart>
          </div>
          <div class="left6">
            <BarChart :data="userData.category"></BarChart>
          </div>
        </div>
        <div class="right">
          <div class="right-top1">
            <CenterHeader :data="userData"></CenterHeader>
          </div>
          <div class="right-top2">
            <CountryCategory
              :data="['ALL', '北京', '上海', '深圳', '杭州', '南京', '武汉']"
            ></CountryCategory>
          </div>
          <div class="right-bottom">
            <div class="right-left">
              <div class="right-left1">
                <Earth :data="mapData"></Earth>
              </div>
              <div class="right-left2">
                <CountryCategory
                  :data="['订单量', '销售额', '用户数', '退单量']"
                  :color="['rgb(178, 209, 126)', 'rgb(116, 166, 49)']"
                ></CountryCategory>
              </div>
              <div class="right-left3">
                <FlexBox :starColor="'rgb(251,253,142)'">
                  <AverageView :data="realTimeOrder" />
                </FlexBox>
                <!-- <dv-border-box-8
                  :color="['rgb(66, 68, 70)', 'rgb(251,253,142)']"
                >
                  <AverageView :data="realTimeOrder" />
                </dv-border-box-8> -->
              </div>
              <div class="right-left4">
                <ScheduleView></ScheduleView>
              </div>
            </div>
            <div class="right-right">
              <div class="right-right1">
                <PlanList :data="userData.areaSales"></PlanList>
              </div>
              <div class="right-right2">
                <ActivateUser :data="userData.areaTop"></ActivateUser>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
/* eslint-disable */
import { getCurrentInstance } from "vue";
import Loading from "../../components/Loading";
import Container from "../../components/Container";
import TopHeader from "../../components/TopHeader";
import Separator from "../../components/Separator";
import TotalUser from "../../components/TotalUser";
import AverageAge from "../../components/AverageAge";
import TotalDevice from "../../components/TotalDevice";
import TotalGender from "../../components/TotalGender";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
// right
import CenterHeader from "../../components/CenterHeader";
import CountryCategory from "../../components/CountryCategory";
import Earth from "../../components/Earth/dataVMap.vue";
import AverageView from "../../components/AverageView";
import ScheduleView from "../../components/ScheduleView";
import PlanList from "../../components/PlanList";
import ActivateUser from "../../components/ActivateUser";

import { useScreenData } from "./useScreenData";
export default {
  components: {
    Loading,
    Container,
    TopHeader,
    Separator,
    TotalUser,
    AverageAge,
    TotalDevice,
    TotalGender,
    LineChart,
    BarChart,
    CenterHeader,
    CountryCategory,
    Earth,
    AverageView,
    ScheduleView,
    PlanList,
    ActivateUser,
  },
  setup() {
    const context = getCurrentInstance().ctx;
    const { ready, userData, ageData, deviceData, realTimeOrder, mapData } =
      useScreenData(context, { once: false });
    return {
      ready,
      userData,
      ageData,
      deviceData,
      realTimeOrder,
      mapData,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  // background-color: rgb(50, 47, 48);
  background: rgb(29, 29, 29);
  color: #fff;
  font-size: 48px;

  #screen-container {
    display: flex;
    flex-direction: column;

    .header {
      height: 167px;
      margin-top: 10px;
    }

    .separator-wrapper {
      height: 10px;
    }

    .center {
      flex: 1;
      display: flex;

      .left {
        flex: 0 0 860px;
        display: flex;
        flex-direction: column;
        width: 860px;
        height: 100%;
        margin: 0 10px;
        box-sizing: border-box;
        background: rgb(60, 61, 64);

        .left1,
        .left2,
        .left3,
        .left4,
        .left5,
        .left6 {
          padding-bottom: 20px;
        }

        .left1 {
          height: 300px;
        }

        .left2 {
          height: 320px;
        }

        .left3 {
          height: 280px;
        }

        .left4 {
          height: 230px;
        }

        .left5 {
          height: 360px;
        }

        .left6 {
          height: 360px;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: 0 10px;
        max-width: 2960px;
        overflow: hidden;

        .right-top1 {
          height: 206px;
          margin-bottom: 20px;
        }

        .right-top2 {
          height: 48px;
          margin-bottom: 20px;
        }

        .right-bottom {
          flex: 1;
          display: flex;

          .right-left {
            display: flex;
            flex-direction: column;
            width: 1917px;

            .right-left1 {
              height: 999px;
            }

            .right-left2 {
              height: 80px;
              padding-top: 20px;
              box-sizing: border-box;
            }

            .right-left3 {
              height: 350px;
              margin-top: 10px;

              .dv-border-box-8 {
                width: 100%;
                height: 100%;
                padding: 5px;
                box-sizing: border-box;
                background: rgb(66, 68, 70);
                border-radius: 10px;
                box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
              }
            }

            .right-left4 {
              height: 220px;
              margin-top: 10px;
            }
          }

          .right-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-left: 10px;

            .right-right1 {
              width: 100%;
              height: 999px;
              padding-right: 10px;
              box-sizing: border-box;
            }

            .right-right2 {
              width: 100%;
              height: 650px;
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
