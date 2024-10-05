

``` rust
use std::fs::{File};
use std::io::{BufReader};
use rodio::{Source, OutputStream, Decoder};
use std::thread::sleep;
use std::time::Duration;

// struct WaveTableOscillator {
//     sample_rate: u32,
//     wave_table: Vec<f32>,
//     index: f32,
//     index_increment: f32,
// }

// impl WaveTableOscillator {
//     fn new(sample_rate: u32, wave_table: Vec<f32>) -> WaveTableOscillator {
//         WaveTableOscillator {
//             sample_rate,
//             wave_table,
//             index: 0.0,
//             index_increment: 0.0,
//         }
//     }

//     fn set_frequency(&mut self, frequency: f32) {
//         self.index_increment = frequency * self.wave_table.len() as f32 / self.sample_rate as f32;
//     }

//     fn get_sample(&mut self) -> f32 {
//         let sample = self.lerp();
//         self.index += self.index_increment;
//         self.index %= self.wave_table.len() as f32;
//         sample
//     }

//     fn lerp(&self) -> f32 {
//         let truncated_index = self.index as usize;
//         let next_index = (truncated_index + 1) % self.wave_table.len();

//         let next_index_weight = self.index - truncated_index as f32;
//         let truncated_index_weight = 1.0 - next_index_weight;

//         truncated_index_weight * self.wave_table[truncated_index]
//             + next_index_weight * self.wave_table[next_index]
//     }
// }

// impl Iterator for WaveTableOscillator {
//     type Item = f32;
//     fn next(&mut self) -> Option<Self::Item> {
//         return Some(self.get_sample());
//     }
// }

// impl Source for WaveTableOscillator {
//     fn channels(&self) -> u16 {
//         return 1;
//     }

//     fn sample_rate(&self) -> u32 {
//         return self.sample_rate;
//     }

//     fn current_frame_len(&self) -> Option<usize> {
//         return None;
//     }

//     fn total_duration(&self) -> Option<Duration> {
//         return None;
//     }
// }

fn main() {
    let (stream, handle_stream) = OutputStream::try_default().unwrap();
    let file = File::open("2.mp3").unwrap();
    let source = Decoder::new(BufReader::new(file)).unwrap();
    let buffered = source.buffered();
    // handle_stream.play_raw(buffered.clone().convert_samples()).unwrap();

    let mut abc = buffered.clone();
    // if let Some(sample) = abc.next() {
        
        //     println!("total_duration: {:?}", sample.zero_value());
        // }
        // else {
            //     println!("None Sample"); 
            // }
    // println!("{}", abc.count());
    let rate = abc.sample_rate();
    let space = 10000000 / rate;
    let channels = abc.channels();
    let total_times = (abc.clone().count() / channels as usize) as u32;
    println!("{}", rate);  // 44100
    println!("{}", space);  // 44100
    println!("{}", channels);  // 2
    println!("{}", total_times);  // 2
    // println!("{}", abc.clone().count() / channels as usize);  // 2

    // 24000/44100
    
    let mut ended = false;
    let mut times: u32 = 0;
    loop {

        for i in 0..10000 {
            match abc.next() {
                Some(sample) => {
                    times += 1;
                    // println!("times: {}", times);
                    // println!()
                    // if (sample > max) {
                    //     max = sample;
    
                    //     println!("max: {}", sample)
                    // }
                    // else if sample < min {
                    //     min = sample;
                    //     println!("min: {}", sample)
                    // }
                },
                None => {
                    ended = true;
                }
            };
        }
        // times += 10000;

        // times += 1;
        // match buffered.current_frame_len() {
        //     Some(s) => println!("???: {}", s),
        //     None => {}
        // }
        // if ended {
        //     break;
        // }
            
        println!("times {}, total", times);
        sleep(Duration::from_millis(space as u64));
        if times > total_times {
            break;
        }
        // break;
    }

    
    // let wave_table_size = 64;
    // let mut wave_table: Vec<f32> = Vec::with_capacity(wave_table_size);

    // for n in 0..wave_table_size {
    //     wave_table.push((2.0 * std::f32::consts::PI * n as f32 / wave_table_size as f32).sin());
    // }

    // let mut oscillator = WaveTableOscillator::new(44100, wave_table);
    // oscillator.set_frequency(440.0);
    // println!("{}", oscillator.sample_rate);

    // let (_stream, stream_handle) = OutputStream::try_default().unwrap();
    // stream_handle.play_raw(oscillator.convert_samples());

    // println!("{:?}", wave_table);

    // sleep(Duration::from_secs(5));
}

```